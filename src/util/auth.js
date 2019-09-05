import jwt from 'jsonwebtoken'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'

const generateToken = async (user, secret) => {
  const createToken = await jwt.sign({
    user: _.pick(user, ['id'])
  },
    secret,
    {
      expiresIn: '15d'
    })

  return Promise.all([createToken]);
}


export const tryLogin = async (email, password, models, SECRET) => {
  const user = await models.User.findOne({ where: { email }, raw: true })

  if (!user) {
    throw new AuthenticationError('Email o contraseña incorrectos.')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new AuthenticationError('Email o contraseña incorrectos.')
  }

  const [token] = await generateToken(user, SECRET)

  return {
    token,
  }
}