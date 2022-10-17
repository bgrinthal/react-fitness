import React, { createContext, useContext } from "react";
import { useExerciseReducer } from './reducers'

// allows user to pass data throught the component tree without having to pass props down every level
const StoreContext = createContext();

// stores context of Provider component
const { Provider } = StoreContext;

//  Creates a global state and passes it to components
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useExerciseReducer({
    exercises: [],
    cart: [],
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

// uses saved conext
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
