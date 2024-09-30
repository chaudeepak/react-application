import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePageLayout from "./pages/layout/homepage-layout";
import Homepage from "./pages/home/landing/homepage";
import LoginPage from "./pages/home/auth/login-page";
import RegisterPage from "./pages/home/auth/register-page";
import PageNotFound from "./pages/home/error/page-not-found";
import AdminLayout from "./pages/layout/admin-layout";
import CheckPermission from "./pages/routing/check-permission";

import AdminDashboard from "./pages/cms/admin/admin-dashboard";
import UserList from "./pages/cms/admin/user/admin-list-user";
import FileValidation from "./pages/home/components/test-file-validation";

import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchPage from "./pages/home/news/search-result-page";
import CrudList from "./pages/cms/admin/crud/crud-list";
import UserCreate from "./pages/cms/admin/user/admin-user-create";
import UserEdit from "./pages/cms/admin/user/admin-user-edit";
import TableComponent from "./pages/cms/admin/crud/table";
import DetailPage from "./pages/home/subscribe/item-detail.page";
import CartList from "./pages/home/cart/cart-detail-page";
import Checkout from "./pages/home/cart/checkout";
import AboutUs from "./pages/home/components/about-us-page";
import Categories from "./pages/home/category-list.jsx/category-list-page";
import SportNews from "./pages/home/news/sports-news-page";
import Subscribe from "./pages/home/subscribe/subscribe-market-page";
import Business from "./pages/home/news/business-news-page";
import LatestNews from "./pages/home/news/latest-news-page";
import CultureNews from "./pages/home/news/culture-news-page";

const Routing = () => {

    return(<>
        <Provider store={store}>
        <BrowserRouter>
        <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePageLayout/>} >
                    <Route index element={<Homepage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    <Route path="categories" element={<Categories />} />
                    {/* <Route path="country" element={<CountryNews />} /> */}
                    
                    <Route path="categories/Culture" element={<CultureNews />} />
                    <Route path="categories/Business" element={<Business />} />
                    <Route path="categories/Latest" element={<LatestNews />} />
                    <Route path="categories/Sports" element={<SportNews />} />

                    <Route path="subscribe" element={<Subscribe />} />
                    <Route path="subscribe/:id" element={<DetailPage />} />
                    <Route path="cart" element={<CartList />} />
                    <Route path="checkout" element={<Checkout />} />

                    <Route path="search" element={<SearchPage />} />
                    {/* <Route path="detail" element={<DetailPage />} /> */}

                    <Route path="file" element={<FileValidation />} />
                    <Route path="table" element={<TableComponent />} />

                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                <Route path="/admin" element={<CheckPermission Component={<AdminLayout />} loggedInuser = "QpwL5tke4Pnpja7X4" />} >
                    <Route index element={<AdminDashboard />} />

                    <Route path="user" element={<UserList />} />
                    <Route path="user/create" element={<UserCreate />} />
                    <Route path="user/:id" element={<UserEdit />} />

                    <Route path="crud" element={<CrudList />} />
                    <Route path="table" element={<TableComponent />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
    </>)
}

export default Routing;