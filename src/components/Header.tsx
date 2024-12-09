import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const { state } = useCart();

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Mini E-Commerce</h1>
      <nav>
        <Link to="/" className="mr-4">Products</Link>
        <Link to="/cart">
          Cart ({state.items.reduce((acc, item) => acc + item.quantity, 0)})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
