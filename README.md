# 72

One mission. 72 hours. Christians everywhere.

This folder is the whole app. Vercel serves it as it is. There is no build step.

## What is in here

| File | What it is |
|---|---|
| `index.html`, `app.js`, `styles.css` | The app |
| `config.js` | The Supabase address and public key |
| `img/` | Photos, logo, map, app icons |
| `api/geo.js` | Works out a visitor's city and country (no GPS) |
| `sw.js`, `manifest.webmanifest` | Lets people add 72 to their home screen |
| `supabase/schema.sql` | The database setup. Paste it into Supabase once. |

## Running missions (all in Supabase, no code)

**Change a mission's words or date:** Table Editor → `missions` → click the cell → type → Save.
`starts_at` is the moment it goes live. It runs for exactly 72 hours from then.
Lists (`could_be`, `ideas`, `ways`) are one item per line.

**Add a mission:** Table Editor → `missions` → Insert row. Give it the next `number` and a `starts_at`.

**Publish a story:** Table Editor → `stories` → tick `approved`. Untick to take it down.

**See who gave an email:** Table Editor → `participants` → `email` column.

## Testing

Open the app with `?test=1` on the end of the address. You will see the test mission, not the real ones.
Send that same link to your testers. `?test=0` goes back to normal.

To start the test mission again, go to SQL Editor and run one of these:

```sql
select restart_test();        -- live right now
select restart_test(5);       -- live in 5 minutes
select restart_test(-4310);   -- as if it started 71h50m ago, so it ends in 10 minutes
```

Each one clears the old test joins and stories.
