import Products from "../pages/Products/Products";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import PATH_URL from "./path";

const routes = [
  {
    path: PATH_URL.PRODUCTS,
    component: Products
  },
  {
    path: PATH_URL.PRODUCT_DETAIL,
    component: ProductDetail
  }
];

export default routes;
