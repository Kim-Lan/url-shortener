const allowedOrigins = [
  'http://localhost:5173',
  'https://camkatsu.com'
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} Not allowed by CORS`))
    }
  }
}
