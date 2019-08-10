import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import PATH_URL from "./path";

const routes = [
  {
    path: PATH_URL.PRODUCT,
    component: Products
  },
  {
    path: PATH_URL.PRODUCT_DETAIL,
    component: ProductDetail
  }
];

export default routes;
