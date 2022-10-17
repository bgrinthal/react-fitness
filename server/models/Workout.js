const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
