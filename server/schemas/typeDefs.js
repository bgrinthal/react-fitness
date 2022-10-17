const { gql } = require('apollo-server-express');


// typedegs define the objects in the graphQL schema.
// Query fetch the objects.  Clients can executed them against the graph.
// Mutation modify data
const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Exercise {
    _id: ID
    name: String
    description: String
    image: String
    demo: String
    mgroup: String
    quantity: Int
    reps: Int
    weight: Int
    category: Category
  }

  type Workout {
    _id: ID
    purchaseDate: String
    exercises: [Exercise]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    workouts: [Workout]
  }

  type Auth {
    token: ID
    user: User
  }
  
  type Query {
    categories: [Category]
    exercises(category: ID, name: String): [Exercise]
    exercise(_id: ID!): Exercise
    user: User
    workout(_id: ID!): Workout

  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addWorkout(exercises: [ID]!): Workout
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateExercise(_id: ID!, quantity: Int! rep: Int! weight: Int!): Exercise
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;