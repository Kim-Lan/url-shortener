import { ShortUrl } from '../models/shortUrl.model.js'
import { customAlphabet, nanoid } from 'nanoid'

async function uniqueNanoId(query) {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
  const label = nanoid();
  const sameLabel = await ShortUrl.findOne({ shortLabel: label });
  if (sameLabel) {
    return uniqueNanoId(query);
  }
  return label;
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
