const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise, Category, Workout } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Resolvers populate graphQL data for every field in your schema
const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    exercises: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Exercise.find(params).populate('category');
    },
    exercise: async (parent, { _id }) => {
      return await Exercise.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'workouts.exercises',
          populate: 'category'
        });

        user.workouts.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    workout: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'workouts.exercises',
          populate: 'category'
        });
        const workout = new Workout({ exercises: args.exercises });

        return user.workouts.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addWorkout: async (parent, { exercises }, context) => {
      console.log(context);
      if (context.user) {
        const workout = new Workout({ exercises });

        await User.findByIdAndUpdate(context.user._id, { $push: { workouts: workout } });

        return workout;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateExercise: async (parent, { _id, quantity, reps, weight }) => {
      const decrement = Math.abs(quantity) * -1;

      //===========================================
      const decrementReps = Math.abs(reps) * -1;
      const decrementWeight = Math.abs(weight) * -1;
      //===========================================

      return [await Exercise.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true }), //;

      //===========================================
      Exercise.findByIdAndUpdate(_id, { $inc: { reps: decrementReps } }, { new: true }),
      Exercise.findByIdAndUpdate(_id, { $inc: { weight: decrementWeight } }, { new: true })]
      //===========================================
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;