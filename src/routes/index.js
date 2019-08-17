import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AddProduct from "../pages/cms/AddProduct";
import PATH_URL from "./path";
import MainLayout from "../layouts/MainLayout";
import CmsLayout from "../layouts/CmsLayout";
import ListProduct from "../pages/cms/ListProduct/ListProduct";

const routes = [
  {
    path: PATH_URL.PRODUCTS,
    component: Products,
    layout: MainLayout
  },
  {
    path: PATH_URL.PRODUCT_DETAIL,
    component: ProductDetail,
    layout: MainLayout
  },
  {
    path: PATH_URL.ADD_PRODUCT,
    component: AddProduct,
    layout: CmsLayout
  },
  {
    path: PATH_URL.LIST_PRODUCT,
    component: ListProduct,
    layout: CmsLayout
  }
];

export default routes;
