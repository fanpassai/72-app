-- 72 database setup.
-- Paste this whole file into Supabase > SQL Editor and press Run.
-- Safe to run more than once. It never overwrites missions you have edited.

-- ---------------------------------------------------------------- tables

create table if not exists missions (
  id            bigint generated always as identity primary key,
  number        int  not null,                 -- 1 shows as "Mission 001"
  name          text not null,                 -- The Empty Chair
  action        text not null,                 -- the one-line mission
  could_be      text not null default '',      -- one per line
  bar_title     text not null default '',      -- "It doesn't have to be impressive."
  bar_body      text not null default '',
  ideas_title   text not null default 'Five simple ways to do this',
  ideas         text not null default '',      -- one per line
  scripture     text not null default '',
  scripture_ref text not null default '',
  campaign_line text not null default '',
  invite_text   text not null default '',
  complete_title text not null default 'You did it.',
  count_question text not null default 'How many people?',
  ways_question text not null default 'How did you participate?',
  ways          text not null default '',      -- one per line
  share_phrase  text not null default 'going',  -- "284 people are <share_phrase>."
  total_label   text not null default 'People reached',
  closing_line  text not null default '',
  between_line  text not null default '',
  photo_reveal  text not null default 'reveal.jpg',
  photo_home    text not null default 'mission.jpg',
  photo_invite  text not null default 'friends.jpg',
  photo_share   text not null default 'share.jpg',
  starts_at     timestamptz not null,          -- the moment it goes live. It runs 72 hours.
  published     boolean not null default true, -- untick to hide a mission completely
  is_test       boolean not null default false,
  unique (number, is_test)
);

create table if not exists participants (
  id          uuid primary key,
  created_at  timestamptz not null default now(),
  last_seen   timestamptz not null default now(),
  email       text,
  alert_live  boolean not null default true,
  alert_last  boolean not null default true,
  alert_done  boolean not null default true,
  push        jsonb
);

create table if not exists joins (
  mission_id     bigint not null references missions(id) on delete cascade,
  participant_id uuid   not null references participants(id) on delete cascade,
  how            text   not null default 'solo',
  country        text,
  region         text,
  city           text,
  lat            real,
  lon            real,
  joined_at      timestamptz not null default now(),
  completed_at   timestamptz,
  people         int,
  way            text,
  primary key (mission_id, participant_id)
);
create index if not exists joins_mission_country on joins (mission_id, country);

create table if not exists stories (
  id             bigint generated always as identity primary key,
  mission_id     bigint not null references missions(id) on delete cascade,
  participant_id uuid   not null references participants(id) on delete cascade,
  body           text   not null,
  first_name     text,
  anonymous      boolean not null default false,
  city           text,
  country        text,
  approved       boolean not null default false,  -- tick this to publish a story
  created_at     timestamptz not null default now(),
  unique (mission_id, participant_id)
);

create table if not exists encouragements (
  story_id       bigint not null references stories(id) on delete cascade,
  participant_id uuid   not null references participants(id) on delete cascade,
  primary key (story_id, participant_id)
);

-- Nobody reads or writes these tables directly from the app.
-- Everything goes through the functions below.
alter table missions       enable row level security;
alter table participants   enable row level security;
alter table joins          enable row level security;
alter table stories        enable row level security;
alter table encouragements enable row level security;

-- ---------------------------------------------------------------- helpers

create or replace function mission_stats(p_mission bigint) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'going',     (select count(*) from joins where mission_id = p_mission),
    'completed', (select count(*) from joins where mission_id = p_mission and completed_at is not null),
    'countries', (select count(distinct country) from joins where mission_id = p_mission and country is not null),
    'cities',    (select count(distinct (country, city)) from joins where mission_id = p_mission and city is not null),
    'people',    (select coalesce(sum(people), 0) from joins where mission_id = p_mission),
    'stories',   (select count(*) from stories where mission_id = p_mission and approved)
  );
$$;

create or replace function mission_json(m missions) returns jsonb
language sql stable as $$
  select to_jsonb(m) || jsonb_build_object('ends_at', m.starts_at + interval '72 hours');
$$;

-- ---------------------------------------------------------------- app functions

create or replace function get_state(p_pid uuid, p_test boolean default false) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_live missions; v_last missions; v_has_live boolean; v_has_last boolean;
  v_next timestamptz; v_me participants; v_out jsonb;
begin
  insert into participants (id) values (p_pid)
    on conflict (id) do update set last_seen = now();
  select * into v_me from participants where id = p_pid;

  select * into v_live from missions
    where published and is_test = p_test and starts_at <= now() and starts_at + interval '72 hours' > now()
    order by starts_at desc limit 1;
  v_has_live := found;

  select * into v_last from missions
    where published and is_test = p_test and starts_at + interval '72 hours' <= now()
    order by starts_at desc limit 1;
  v_has_last := found;

  select min(starts_at) into v_next from missions
    where published and is_test = p_test and starts_at > now();

  v_out := jsonb_build_object(
    'now', now(),
    'next_at', v_next,
    'me', jsonb_build_object(
      'email', v_me.email, 'alert_live', v_me.alert_live, 'alert_last', v_me.alert_last,
      'alert_done', v_me.alert_done, 'has_push', v_me.push is not null),
    'live', null, 'last', null, 'join', null, 'last_join', null, 'stats', null, 'last_stats', null);

  if v_has_live then
    v_out := v_out || jsonb_build_object(
      'live', mission_json(v_live),
      'stats', mission_stats(v_live.id),
      'join', (select to_jsonb(j) - 'participant_id' from joins j where j.mission_id = v_live.id and j.participant_id = p_pid));
  end if;
  if v_has_last then
    v_out := v_out || jsonb_build_object(
      'last', mission_json(v_last),
      'last_stats', mission_stats(v_last.id),
      'last_join', (select to_jsonb(j) - 'participant_id' from joins j where j.mission_id = v_last.id and j.participant_id = p_pid));
  end if;
  return v_out;
end $$;

create or replace function join_mission(
  p_pid uuid, p_mission bigint, p_how text,
  p_country text default null, p_region text default null, p_city text default null,
  p_lat real default null, p_lon real default null) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if p_how not in ('solo', 'two', 'group') then raise exception 'bad how'; end if;
  if not exists (select 1 from missions where id = p_mission and published
                 and starts_at <= now() and starts_at + interval '72 hours' > now()) then
    raise exception 'mission is not live';
  end if;
  insert into participants (id) values (p_pid) on conflict (id) do nothing;
  insert into joins (mission_id, participant_id, how, country, region, city, lat, lon)
    values (p_mission, p_pid, p_how, nullif(left(p_country, 2), ''), nullif(left(p_region, 80), ''),
            nullif(left(p_city, 80), ''), p_lat, p_lon)
    on conflict (mission_id, participant_id) do update set how = excluded.how;
  return mission_stats(p_mission);
end $$;

create or replace function complete_mission(p_pid uuid, p_mission bigint, p_people int, p_way text) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from missions where id = p_mission and published
                 and starts_at <= now() and starts_at + interval '72 hours' > now()) then
    raise exception 'mission is not live';
  end if;
  update joins set completed_at = coalesce(completed_at, now()),
                   people = greatest(1, least(coalesce(p_people, 1), 5)),
                   way = left(p_way, 80)
    where mission_id = p_mission and participant_id = p_pid;
  if not found then raise exception 'join the mission first'; end if;
  return mission_stats(p_mission);
end $$;

create or replace function get_impact(p_mission bigint, p_country text default null, p_city text default null) returns jsonb
language sql stable security definer set search_path = public as $$
  select mission_stats(p_mission) || jsonb_build_object(
    'my_country', (select count(*) from joins where mission_id = p_mission and country = p_country),
    'my_city',    (select count(*) from joins where mission_id = p_mission and country = p_country and city = p_city),
    'by_country', coalesce((select jsonb_agg(x) from (
        select country, count(*) as n from joins
        where mission_id = p_mission and country is not null
        group by country order by count(*) desc, country limit 60) x), '[]'::jsonb),
    'by_city', coalesce((select jsonb_agg(x) from (
        select city, country, count(*) as n from joins
        where mission_id = p_mission and city is not null
        group by city, country order by count(*) desc, city limit 60) x), '[]'::jsonb),
    'points', coalesce((select jsonb_agg(x) from (
        select round(lat) as lat, round(lon) as lon, count(*) as n from joins
        where mission_id = p_mission and lat is not null and lon is not null
        group by round(lat), round(lon) order by count(*) desc limit 400) x), '[]'::jsonb)
  );
$$;

create or replace function add_story(p_pid uuid, p_mission bigint, p_body text,
                                     p_name text default null, p_anonymous boolean default false) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_join joins; v_body text := btrim(coalesce(p_body, ''));
begin
  if char_length(v_body) < 1 or char_length(v_body) > 500 then raise exception 'story must be 1 to 500 characters'; end if;
  select * into v_join from joins where mission_id = p_mission and participant_id = p_pid;
  if not found then raise exception 'join the mission first'; end if;
  insert into stories (mission_id, participant_id, body, first_name, anonymous, city, country)
    values (p_mission, p_pid, v_body, nullif(left(btrim(coalesce(p_name, '')), 40), ''), coalesce(p_anonymous, false),
            v_join.city, v_join.country)
    on conflict (mission_id, participant_id) do update
      set body = excluded.body, first_name = excluded.first_name, anonymous = excluded.anonymous,
          approved = false, created_at = now();
  return jsonb_build_object('ok', true);
end $$;

create or replace function list_stories(p_pid uuid, p_mission bigint, p_country text default null) returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(x), '[]'::jsonb) from (
    select s.id, s.body,
           case when s.anonymous then null else s.first_name end as first_name,
           case when s.anonymous then null else s.city end as city,
           s.country,
           s.participant_id = p_pid as mine,
           not s.approved as pending,
           (select count(*) from encouragements e where e.story_id = s.id) as n,
           exists (select 1 from encouragements e where e.story_id = s.id and e.participant_id = p_pid) as i_did
    from stories s
    where s.mission_id = p_mission
      and (s.approved or s.participant_id = p_pid)
      and (p_country is null or s.country = p_country)
    order by s.created_at desc limit 100) x;
$$;

create or replace function toggle_encourage(p_pid uuid, p_story bigint) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_on boolean;
begin
  if not exists (select 1 from stories where id = p_story and approved) then raise exception 'no such story'; end if;
  insert into participants (id) values (p_pid) on conflict (id) do nothing;
  delete from encouragements where story_id = p_story and participant_id = p_pid;
  if found then v_on := false;
  else insert into encouragements (story_id, participant_id) values (p_story, p_pid); v_on := true;
  end if;
  return jsonb_build_object('on', v_on, 'n', (select count(*) from encouragements where story_id = p_story));
end $$;

create or replace function save_contact(p_pid uuid, p_email text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
begin
  if v_email is not null and (char_length(v_email) > 200 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') then
    raise exception 'that email does not look right';
  end if;
  insert into participants (id, email) values (p_pid, v_email)
    on conflict (id) do update set email = excluded.email;
  return jsonb_build_object('ok', true);
end $$;

create or replace function save_alerts(p_pid uuid, p_live boolean, p_last boolean, p_done boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  insert into participants (id, alert_live, alert_last, alert_done) values (p_pid, p_live, p_last, p_done)
    on conflict (id) do update set alert_live = excluded.alert_live, alert_last = excluded.alert_last, alert_done = excluded.alert_done;
  return jsonb_build_object('ok', true);
end $$;

create or replace function save_push(p_pid uuid, p_sub jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  insert into participants (id, push) values (p_pid, p_sub)
    on conflict (id) do update set push = excluded.push;
  return jsonb_build_object('ok', true);
end $$;

-- For you only (run it from the SQL Editor): start the test mission again.
--   select restart_test();      -- goes live right now, clears old test data
--   select restart_test(5);     -- goes live in 5 minutes
--   select restart_test(-4310); -- pretend it started 71h50m ago, so you can watch it end in 10 minutes
create or replace function restart_test(p_minutes int default 0) returns text
language plpgsql security definer set search_path = public as $$
begin
  delete from joins   where mission_id in (select id from missions where is_test);
  delete from stories where mission_id in (select id from missions where is_test);
  update missions set starts_at = now() + make_interval(mins => p_minutes) where is_test;
  return 'Test mission starts at ' || (select to_char(min(starts_at) at time zone 'America/New_York', 'Dy Mon DD, HH12:MI AM') from missions where is_test) || ' Eastern';
end $$;

revoke all on function restart_test(int) from public;
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    revoke all on function restart_test(int) from anon, authenticated;
    grant execute on function get_state(uuid, boolean), join_mission(uuid, bigint, text, text, text, text, real, real),
      complete_mission(uuid, bigint, int, text), get_impact(bigint, text, text),
      add_story(uuid, bigint, text, text, boolean), list_stories(uuid, bigint, text),
      toggle_encourage(uuid, bigint), save_contact(uuid, text), save_alerts(uuid, boolean, boolean, boolean),
      save_push(uuid, jsonb) to anon, authenticated;
  end if;
end $$;

-- ---------------------------------------------------------------- missions

insert into missions (number, name, action, could_be, bar_title, bar_body, ideas, scripture, scripture_ref,
  campaign_line, invite_text, complete_title, count_question, ways_question, ways, share_phrase, total_label,
  closing_line, between_line, photo_reveal, photo_home, photo_invite, photo_share, starts_at, is_test)
values
(1, 'The Extra Gift',
 'Give one thoughtful gift to someone who probably isn’t expecting one from you.',
 E'the janitor\na delivery driver\na teacher\na neighbor\na single parent\na coworker\nan elderly person\na security guard\nsomeone new to the country\nsomeone who quietly serves others',
 'It doesn’t have to be expensive.',
 'Bought, homemade, written, cooked, or an experience. The point is intentional generosity.',
 E'Buy something small they’d never buy themselves\nBake or cook something\nWrite a card that says why\nGive an experience: a coffee, a ticket, a ride\nWrap it and hand it over in person',
 '“He went about doing good.”', 'Acts 10:38',
 'One more gift. One unexpected person. 72 hours.',
 'I’m doing The Extra Gift with 72. We have 72 hours to give one thoughtful gift to someone who isn’t expecting it. Come do it with me.',
 'You gave one more gift.', 'How many gifts did you give?', 'What did you give?',
 E'Something bought\nSomething homemade\nSomething written\nA meal or food\nAn experience\nOther',
 'giving one more gift', 'Gifts given',
 'For 72 hours, people everywhere gave to someone who wasn’t expecting it.',
 'Until then, keep giving.',
 'sunrise.jpg', 'sunrise.jpg', 'friends.jpg', 'dusk.jpg',
 '2026-12-22 12:00:00+00', false),

(2, 'The Empty Chair',
 'Invite someone who might otherwise eat alone to share a meal with you.',
 E'a neighbor\na coworker\na student away from home\nan elderly person\na single parent\na widow or widower\nsomeone new to your church\nsomeone you simply haven’t taken the time to know',
 'It doesn’t have to be impressive.',
 'Breakfast. Coffee. Sandwiches. Dinner. Takeout. The point is the table.',
 E'Invite someone home\nTake someone to lunch\nBring a meal to someone and stay\nInvite another family\nTurn your small group into a table',
 '“Do not neglect to show hospitality to strangers.”', 'Hebrews 13:2',
 'Make room. Set one more place.',
 'I’m doing The Empty Chair with 72. We have 72 hours to invite someone who might otherwise eat alone to share a meal. Come do it with me.',
 'You made room at the table.', 'How many people shared the table?', 'How did you participate?',
 E'Home meal\nRestaurant or café\nDelivered a meal and stayed\nGroup meal\nOther',
 'making room at the table', 'People gathered',
 'For 72 hours, people everywhere made room for someone else.',
 'Until then, keep making room.',
 'reveal.jpg', 'mission.jpg', 'friends.jpg', 'share.jpg',
 '2027-01-19 12:00:00+00', false),

(3, 'The Unasked Favor',
 'Do one useful thing for someone before they have to ask.',
 E'a neighbor\na coworker\nan exhausted parent\nan elderly person\nsomeone moving house\nsomeone without a car\na friend who never asks for help',
 'No money required.',
 'Notice it. Do it. Don’t wait to be asked.',
 E'Mow a neighbor’s lawn\nBring in someone’s groceries or trash bins\nWatch someone’s kids for an hour\nCook dinner for an exhausted parent\nGive someone a ride',
 '“As we have opportunity, let us do good to everyone.”', 'Galatians 6:10',
 'Notice it. Do it. Don’t wait to be asked.',
 'I’m doing The Unasked Favor with 72. We have 72 hours to do one useful thing for someone before they have to ask. Come do it with me.',
 'You didn’t wait to be asked.', 'How many people did you help?', 'What did you do?',
 E'Yard or house work\nAn errand or groceries\nA ride\nChildcare\nA meal\nOther',
 'doing the unasked favor', 'People helped',
 'For 72 hours, people everywhere noticed a need and met it.',
 'Until then, keep noticing.',
 'dusk.jpg', 'dusk.jpg', 'friends.jpg', 'sunrise.jpg',
 '2027-02-23 12:00:00+00', false),

-- The test mission. Only people who open the app with ?test=1 can see it.
(0, 'The Empty Chair',
 'Invite someone who might otherwise eat alone to share a meal with you.',
 E'a neighbor\na coworker\na student away from home\nan elderly person\na single parent\na widow or widower\nsomeone new to your church\nsomeone you simply haven’t taken the time to know',
 'It doesn’t have to be impressive.',
 'Breakfast. Coffee. Sandwiches. Dinner. Takeout. The point is the table.',
 E'Invite someone home\nTake someone to lunch\nBring a meal to someone and stay\nInvite another family\nTurn your small group into a table',
 '“Do not neglect to show hospitality to strangers.”', 'Hebrews 13:2',
 'Make room. Set one more place.',
 'I’m doing The Empty Chair with 72. We have 72 hours to invite someone who might otherwise eat alone to share a meal. Come do it with me.',
 'You made room at the table.', 'How many people shared the table?', 'How did you participate?',
 E'Home meal\nRestaurant or café\nDelivered a meal and stayed\nGroup meal\nOther',
 'making room at the table', 'People gathered',
 'For 72 hours, people everywhere made room for someone else.',
 'Until then, keep making room.',
 'reveal.jpg', 'mission.jpg', 'friends.jpg', 'share.jpg',
 now(), true)
on conflict (number, is_test) do nothing;
