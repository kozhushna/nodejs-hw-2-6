const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegex =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const passwordRegex = /^[a-z0-9]{8,18}$/;

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      match: passwordRegex,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegex,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userShema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userShema);

module.exports = {
  User,
  schemas,
};
