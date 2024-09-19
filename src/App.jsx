import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Policy from "./pages/Policy";
import Rewards from "./pages/Rewards";
import AboutUs from "./pages/AboutUs";
import Delivery from "./pages/Delivery";
import LayOut from "./components/LayOut";
import FavProduct from "./pages/FavProduct";
import RequestForm from "./pages/RequestForm";
import FormModal from "./components/FormModal";
import OrderDetails from "./pages/OrderDetails";
import ProductDetails from "./components/ProductDetails";
import CategoryProduct from "./components/CategoryProduct";
import BrandProduct from "./components/BrandProduct";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayOut />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/waitlist" element={<FormModal />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/order_details/:id" element={<OrderDetails />} />
      <Route path="/shop/:productName" element={<ProductDetails />} />
      <Route path="/:categories" element={<CategoryProduct />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/favorite" element={<FavProduct />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/request" element={<RequestForm />} />
      <Route path="/brand_product" element={<BrandProduct />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}
export default App;
