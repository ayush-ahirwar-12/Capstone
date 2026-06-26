import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { sendAuthNotification } from '../config/mq.js'

const router = Router()

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/'
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'Google authentication failed'
        })
      }
      const { id, displayName, emails, photos } = req.user

      let user = await User.findOne({ googleId: id })

      if (!user) {
        user = new User({
          googleId: id,
          email: emails[0].value,
          name: displayName,
          avatar: photos[0].value
        })

        await user.save()
      }

      await sendAuthNotification({
        userId: user._id,
        action: 'google_login',
        timestamp: new Date(),
        email: user.email
      })

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })

      res.cookie('token', token, {
        httpOnly: true
      })

      res.redirect('/')
    } catch (err) {
      console.error('Error during Google authentication:', err)
      res.redirect('/') // Redirect to your frontend on error
    }
  }
)

export default router
