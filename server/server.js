import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors.js'
import connectDb from './config/db.js'
import { ShortUrl } from './models/shortUrl.model.js'

const PORT = process.env.PORT || 3001;

const app = express();

connectDb();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors(corsOptions));

app.get('/api/urls', async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.status(200).json(shortUrls);
});

app.post('/api/shorten', async (req, res) => {
  const { fullUrl, shortLabel } = req.body;
  const url = await ShortUrl.create({
    fullUrl,
    shortLabel
  });
  res.status(200).json(url);
});

app.get('/:shortLabel', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ shortLabel: req.params.shortLabel });
  if (!shortUrl) res.status(404);

  shortUrl.visits++;
  shortUrl.save();

  res.redirect(shortUrl.fullUrl);
});

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
