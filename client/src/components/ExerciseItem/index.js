import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY, UPDATE_CART_REPS, UPDATE_CART_WEIGHT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ExerciseItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    // price,
    quantity,
    mgroup
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      //============================================================
      dispatch({
        type: UPDATE_CART_REPS,
        _id: _id,
        repQuantity: parseInt(itemInCart.repQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        repQuantity: parseInt(itemInCart.repQuantity) + 1
      });
      dispatch({
        type: UPDATE_CART_WEIGHT,
        _id: _id,
        weightQuantity: parseInt(itemInCart.weightQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        weightQuantity: parseInt(itemInCart.weightQuantity) + 1
      });
      //============================================================
    } else {
      dispatch({
        type: ADD_TO_CART,
        exercise: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }

  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/exercises/${_id}`}>
        <img className="exercise-img"
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>{mgroup}</div>
      {/* <span>${price}</span> */}
        <button onClick={addToCart}>Add Workout</button>
    </div>
  );
}

export default ExerciseItem;
