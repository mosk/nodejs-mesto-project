import mongoose from 'mongoose';

const SCHEMA_CARD = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: 'ObjectId, обязательное поле',
  likes: 'массив ObjectId, по умолчанию пустой',
  createdAt: 'дата создания, по умолчанию Date.now',
});

export default mongoose.model('card', SCHEMA_CARD);
