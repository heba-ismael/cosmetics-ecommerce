import { lazy, Suspense } from "react";
import BtmHeader from "./components/header/BtmHeader";
import TopHeader from "./components/header/TopHeader";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";

// Code splitting: each page only loads when the user navigates to it
const Home = lazy(() => import("./page/Home/Home"));
const Cart = lazy(() => import("./page/cart/Cart"));
const SearchResults = lazy(() => import("./page/SearchResults"));
const Favorites = lazy(() => import("./page/favorites/Favorites"));
const ProductDetails = lazy(() => import("./page/productDetails/ProductDetails"));
const CategoryPage = lazy(() => import("./page/CategoryPage/CategoryPage"));
const About = lazy(() => import("./page/About/About"));
const Contact = lazy(() => import("./page/Contact/Contact"));
const Orders = lazy(() => import("./page/Orders/Orders"));
const AdminDashboard = lazy(() => import("./page/Admin/AdminDashboard"));
const SignIn = lazy(() => import("./page/SignIn/SignIn"));
const SignUp = lazy(() => import("./page/SignUp/SignUp"));
const NotFound = lazy(() => import("./page/NotFound/NotFound"));

function PageLoadingFallback() {
  return <div style={{ minHeight: "50vh" }} />;
}

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />
      <ScrollToTop />

      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}

export default App;
