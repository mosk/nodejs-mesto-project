import { ICustomError } from '../types';

const ERRORS: Record<string, ICustomError> = {
  DEFAULT: {
    code: 500,
    message: 'На сервере произошла ошибка',
  },
  INCORRECT_USER_ID: {
    code: 400,
    message: 'Передан некорректный id пользователя',
  },
  INCORRECT_CARD_ID: {
    code: 400,
    message: 'Передан некорректный id карточки',
  },
  INCORRECT_DATA: {
    code: 400,
    message: 'Переданы некорректные данные',
  },
  NOT_FOUND_USER: {
    code: 404,
    message: 'Пользователь по указанному _id не найден',
  },
  NOT_FOUND_CARD: {
    code: 404,
    message: 'Карточка с указанным _id не найдена',
  },
};

export default ERRORS;
