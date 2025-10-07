import { ShortUrl } from '../models/shortUrl.model.js'
import { nanoid } from 'nanoid'

async function uniqueNanoId(query) {
  const nanoId = nanoid(8);
  const sameNanoId = await ShortUrl.findOne({ shortLabel: nanoId });
  if (sameNanoId) {
    return uniqueNanoId(query);
  }
  return nanoId;
}

export const getUrls = async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.status(200).json(shortUrls);
};

export const shortenUrl = async (req, res) => {
  const { fullUrl, shortLabel } = req.body;

  if (!fullUrl) {
    res.status(400).json({
      'error': 'Must provide a URL to shorten'
    });
  }

  const existingUrl = await ShortUrl.findOne({ shortLabel });
  if (existingUrl) {
    res.status(400).json({
      'error': 'URL with this shortened label already exists'
    });
  }

  let nanoId;
  if (!shortLabel) {
    nanoId = await uniqueNanoId();
  }

  const shortUrl = await ShortUrl.create({
    fullUrl,
    shortLabel: shortLabel ? shortLabel : nanoId,
  });
  res.status(200).json(shortUrl);
};

export const deleteUrl = async (req, res) => {
  await ShortUrl.deleteOne({ shortLabel: req.body.shortLabel }).exec();
  res.sendStatus(200);
}
