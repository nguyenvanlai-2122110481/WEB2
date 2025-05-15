import { createBrowserRouter } from "react-router-dom";
import Shop from "./Shop";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductDetails from "./pages/ProductDetailPage/ProductDetails";
import { loadProductBySlug } from "./routes/products";
import AuthenticationWrapper from "./pages/AuthenticationWrapper";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Checkout from "./pages/Checkout/Checkout";
import ConfirmPayment from "./pages/ConfirmPayment/ConfirmPayment";
import OrderConfirmed from "./pages/OrderConfirmed/OrderConfirmed";
import Profile from "./pages/Account/Profile";
import Orders from "./pages/Account/Orders";
import Settings from "./pages/Account/Settings";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ProductList from "./pages/AdminPanel/ProductList";
import ProductForm from "./pages/AdminPanel/ProductForm";
import CategoryList from "./pages/AdminPanel/CategoryList";
import CategoryForm from "./pages/AdminPanel/CategoryForm";
import UserList from "./pages/AdminPanel/UserList";
import OrderList from "./pages/AdminPanel/OrderList";
import OrderEdit from "./pages/AdminPanel/OrderEdit";
import SearchResults from "./components/Search/SearchResults";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ShopApplicationWrapper />,
        children: [
            {
                path: "/",
                element: <Shop />
            },
            {
                path: "/category/:id",
                element: <ProductListPage />
            },
            {
                path: "/product/:slug",
                loader: loadProductBySlug,
                element: <ProductDetails />
            },
            {
                path: "/cart-items",
                element: <Cart />
            },
            {
                path: "/account-details/",
                element: <ProtectedRoute><Account /></ProtectedRoute>,
                children: [
                    {
                        path: "profile",
                        element: <ProtectedRoute><Profile /></ProtectedRoute>
                    },
                    {
                        path: "orders",
                        element: <ProtectedRoute><Orders /></ProtectedRoute>
                    },
                    {
                        path: "settings",
                        element: <ProtectedRoute><Settings /></ProtectedRoute>
                    }
                ]
            },
            {
                path: "/checkout",
                element: <ProtectedRoute><Checkout /></ProtectedRoute>
            },
            {
                path: "/orderConfirmed",
                element: <OrderConfirmed />
            },
            {
                path: "/search",
                element: <SearchResults />
            }
        ]
    },
    {
        path: "/v1/",
        element: <AuthenticationWrapper />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "/confirmPayment",
        element: <ConfirmPayment />
    },
    {
        path: "/admin",
        element: <ProtectedRoute><AdminPanel /></ProtectedRoute>,
        children: [
            {
                path: "products",
                element: <ProductList />
            },
            {
                path: "products/create",
                element: <ProductForm />
            },
            {
                path: "products/edit/:id",
                element: <ProductForm />
            },
            {
                path: "categories",
                element: <CategoryList />
            },
            {
                path: "categories/create",
                element: <CategoryForm />
            },
            {
                path: "categories/edit/:id",
                element: <CategoryForm />
            },
            {
                path: "users",
                element: <UserList />
            },
            {
                path: "orders",
                element: <OrderList />
            },
            {
                path: "orders/edit/:id",
                element: <OrderEdit />
            }
        ]
    }
]);