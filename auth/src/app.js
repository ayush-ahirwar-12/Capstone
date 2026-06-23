import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookies from 'cookie-parser'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import authRoutes from './routes/auth.route.js'

const app = express()
app.use(morgan('dev'))
app.use(cookies())
app.use(passport.initialize())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
)



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

app.set('trust proxy', 1);

app.get("/_status/healthz", (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get("/_status/readyz", (req, res) => {
    res.status(200).json({ status: 'ready' });
});

app.use('/api/auth', authRoutes);


export default app
