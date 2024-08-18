import { Joi } from 'celebrate';

export const validateCardId = {
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
};

export const validateNewCard = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
};

export const validateUserId = {
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
};

export const validateNewUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
};

export const validateUpdateProfile = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

export const validateUpdateAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
};
