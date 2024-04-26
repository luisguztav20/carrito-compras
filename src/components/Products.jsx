import "./Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import PropTypes from "prop-types";
import { useCart } from "../hooks/useCart.jsx";

export function Products({ products }) {
  //Para utilizar el botón de añadir
  const { addToCart, cart, removeFromCart } = useCart(); //pasamos este al button

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 12).map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>
                  {product.title} - ${product.price}{" "}
                </strong>
              </div>
              <div>
                <button 
                style={{ backgroundColor : isProductInCart ? 'red' : 'green'}}
                onClick={ () => {isProductInCart ? removeFromCart(product) : addToCart(product) } }>
                  {
                    isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

Products.propTypes = {
  products: PropTypes.func.isRequired,
};
