const ERROR_MSG: Record<string, string> = {
  // 400
  BAD_USER_ID: 'Передан некорректный id пользователя',
  BAD_CARD_ID: 'Передан некорректный id карточки',
  BAD_DATA: 'Переданы некорректные данные',
  // 401
  AUTH_WRONG_CREDS: 'Неправильные почта или пароль',
  AUTH_WRONG_TOKEN: 'Неверный токен',
  // 403
  FORBIDDEN: 'Так нельзя',
  // 404
  NOT_FOUND: '«В жизни бывают моменты, когда зашел не в ту дверь...»',
  NOT_FOUND_USER: 'Пользователь по указанному _id не найден',
  NOT_FOUND_CARD: 'Карточка с указанным _id не найдена',
  // 409
  REG_EMAIL_ALREADY_EXIST: 'Email занят – попробуйте другой',
  // 500
  DEFAULT: 'На сервере произошла ошибка',
};

export default ERROR_MSG;
