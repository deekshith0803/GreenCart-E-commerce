import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import Login from './components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrder from './pages/MyOrder.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Order from './pages/seller/Order.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import Loading from './components/Loading.jsx'


const App = () => {

  const isSellerPath = useLocation().pathname.includes('/seller');
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-26 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-order' element={<MyOrder />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />} >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='order' element={<Order />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
