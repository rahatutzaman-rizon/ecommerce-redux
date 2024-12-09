import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import PostsAndPhotosPage from "./pages/testing";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/product" element={<ProductListPage />} />
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/test" element={<PostsAndPhotosPage />} />

    </Routes>
  );
};

export default Router;
