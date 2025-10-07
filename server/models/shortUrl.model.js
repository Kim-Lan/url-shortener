import mongoose from 'mongoose'
import nanoid from 'nanoid'
const { Schema, model } = mongoose;

const shortUrlSchema = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortLabel: {
    type: String,
    required: true,
    default: nanoid,
  },
  visits: {
    type: Number,
    required: true,
    default: 0
  }
});

export const ShortUrl = model('ShortUrl', shortUrlSchema);
