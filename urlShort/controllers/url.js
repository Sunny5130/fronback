const shortid = require("shortid");
const Url = require("../models/url");

async function handelPostUrl(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid.generate();

  await Url.create({
    shortId,
    redirectUrl: url,
    visitHistory: [],
  });

  return res.status(201).json({
    message: "Short URL created",
    shortUrl: `http://localhost:3000/url/${shortId}`,
  });
}

module.exports = { handelPostUrl };
