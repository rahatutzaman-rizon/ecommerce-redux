import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./Router";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <AppRouter />
      </Router>
    </CartProvider>
  );
};

export default App;
