import React from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART } from "../../utils/actions";
import "./style.css";

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }
//You should always wrap emojis (like the shopping cart icon) in a <span> element that includes role and aria-label attributes. Doing so will help screen readers understand the context of the emoji.


  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {
              Auth.loggedIn() ?
                <button>
                  Checkout
              </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
    //Wrap it in a ternary expression 
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
          </span>
          You haven't added anything to your cart yet!
          </h3>
        )}
    </div>
  );
};

export default Cart;
