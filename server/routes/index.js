import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller.js'
import { getUrls, shortenUrl, deleteUrl } from '../controllers/shortUrls.controller.js'

const router = express.Router();

router.post('/login', loginUser);

// router.post('/register', registerUser);

router.use(function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  next();
});

router.get('/urls', getUrls);

router.post('/shorten', shortenUrl);

router.delete('/delete', deleteUrl)

export default router;
