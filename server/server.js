import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors.js'
import connectDb from './config/db.js'
import { ShortUrl } from './models/shortUrl.model.js'
import api from './routes/index.js'

const PORT = process.env.PORT || 3001;

const app = express();

app.set('trust proxy', true);

connectDb();

// CORS
app.use(cors(corsOptions));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = import.meta.dirname + '/views/';
app.use(express.static(path));

app.get('/', function (req, res) {
  res.sendFile(path + 'index.html');
})

app.options('/admin/:all', cors()) 

app.get('/admin/:all', function (req,res) {
  res.sendFile(path + 'admin/index.html');
});

app.use('/api', api);

app.get('/pp/:shortLabel', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ shortLabel: req.params.shortLabel });
  if (!shortUrl) res.status(404);

  shortUrl.visits++;
  shortUrl.save();

  res.redirect(shortUrl.fullUrl);
});

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
