// Tells the app roughly where this phone is (city and country), using what Vercel already knows
// from the connection. Nothing is stored here. No GPS, no permission prompt.
module.exports = (req, res) => {
  const h = req.headers;
  const dec = (v) => { try { return v ? decodeURIComponent(v) : null; } catch (e) { return v || null; } };
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.round(n * 10) / 10 : null; };
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    country: h['x-vercel-ip-country'] || null,
    region: h['x-vercel-ip-country-region'] || null,
    city: dec(h['x-vercel-ip-city']),
    lat: num(h['x-vercel-ip-latitude']),
    lon: num(h['x-vercel-ip-longitude'])
  });
};
