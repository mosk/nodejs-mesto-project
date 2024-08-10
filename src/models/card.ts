import { Schema, model } from 'mongoose';
import { ICard } from '../types';

const Card = new Schema<ICard>({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
});

export default model<ICard>('card', Card);
