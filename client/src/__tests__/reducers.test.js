import { reducer } from '../utils/reducers';
import {
  UPDATE_EXERCISE,
  ADD_TO_ROUTINE,
  UPDATE_QUANTITY,
  REMOVE_FROM_ROUTINE,
  ADD_MULTIPLE_TO_ROUTINE,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_ROUTINE,
  TOGGLE_ROUTINE
} from '../utils/actions';

const initialState = {
  exercises: [],
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false,
  categories: [{ name: 'Food' }],
  currentCategory: '1',
};

test('UPDATE_EXERCISE', () => {
  let newState = reducer(initialState, {
    type: UPDATE_EXERCISE,
    exercises: [{}, {}]
  });

  expect(newState.exercises.length).toBe(2);
  expect(initialState.exercises.length).toBe(0);
});

test('ADD_TO_ROUTINE', () => {
  let newState = reducer(initialState, {
    type: ADD_TO_ROUTINE,
    exercise: { purchaseQuantity: 1 }
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_QUANTITY,
    _id: '1',
    purchaseQuantity: 3
  });

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);
  expect(initialState.cartOpen).toBe(false);
});

test('REMOVE_FROM_ROUTINE', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_ROUTINE,
    _id: '1'
  });

  expect(newState1.cartOpen).toBe(true);
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_ROUTINE,
    _id: '2'
  });

  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_ROUTINE', () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_ROUTINE,
    exercises: [{}, {}]
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}]
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2'
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});

test('CLEAR_ROUTINE', () => {
  let newState = reducer(initialState, {
    type: CLEAR_ROUTINE
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_ROUTINE', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_ROUTINE
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);
  
  let newState2 = reducer(newState, {
    type: TOGGLE_ROUTINE
  });

  expect(newState2.cartOpen).toBe(false);
});
