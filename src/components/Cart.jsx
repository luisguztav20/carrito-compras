import "./Cart.css";
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";

function CartItem({ thumbnail, title, price, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${ price }
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();

  const { cart, clearCart, addToCart } = useCart();

  //logica para ir sumando el total y suma de productos

  /**let totalProductos = 0;
  let totalPago = 0;
  cart.forEach((product) => {
    totalProductos += product.quantity;
    totalPago += product.price * product.quantity;
  });**/

  const totalProductos = cart.reduce((total, product) => total + product.quantity, 0);
  const totalPago = cart.reduce((total, product) => total + product.price * product.quantity, 0)



  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={ () => addToCart(product) }
                {...product}
              />
          ))
          }
          
        </ul>
        <p>Productos: {totalProductos}</p>
        <p>Total pago: ${totalPago}</p>
        <button style={{ backgroundColor: "#E36414" }} onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}