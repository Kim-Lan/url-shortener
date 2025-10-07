import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller.js'
import { getUrls, shortenUrl, deleteUrl } from '../controllers/shortUrls.controller.js'

const router = express.Router();

router.get('/urls', getUrls);

router.post('/shorten', shortenUrl);

router.delete('/delete', deleteUrl)

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;
