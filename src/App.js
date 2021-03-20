import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './Theme'

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

// import Home from './pages/Home';
// import Footer from './components/Footer'
// import SignUp from './pages/auth/SignUp';
// import SignIn from './pages/auth/SignIn';
// import SignupSuccess from './pages/auth/SignupSuccess';
// import Navbar from './components/nav/Navbar';
// import SideDrawer from './components/drawer/SideDrawer'
// import SignupComplete from './pages/auth/SignUpComplete'
// import ForgotPassword from './pages/auth/ForgotPassword'
// import History from './pages/user/History'
// import Password from './pages/user/Password'
// import Wishlist from './pages/user/Wishlist'
// import AccountIssue from './pages/user/AccountIssue'
// import UserRoute from './routes/UserRoute'
// import AdminRoute from './routes/AdminRoute'
// import AdminDashboard from './pages/admin/AdminDashboard'

// import ChoiceCreate from './pages/admin/choice/ChoiceCreate'
// import ChoiceUpdate from './pages/admin/choice/ChoiceUpdate'
// import CategoryCreate from './pages/admin/category/CategoryCreate'
// import CategoryUpdate from './pages/admin/category/CategoryUpdate'
// import CategoryHome from './pages/category/CategoryHome'
// import SubCreate from './pages/admin/sub/SubCreate'
// import SubUpdate from './pages/admin/sub/SubUpdate'
// import SubHome from './pages/sub/SubHome'
// import ProductCreate from './pages/admin/product/ProductCreate'
// import ProductUpdate from './pages/admin/product/ProductUpdate'
// import AllProducts from './pages/admin/product/AllProducts'
// import Product from './pages/Product'
// import Shop from './pages/Shop'
// import Menu from './pages/Menu'
// import Cart from './pages/Cart'
// import Checkout from './pages/Checkout'
// import CashPayment from './pages/CashPayment'
// import CreateCouponPage from './pages/admin/coupon/CreateCouponPage'
// import Payment from './pages/Payment'

// Lazy

const Home = lazy(() => import('./pages/Home'));
const Footer = lazy(() => import('./components/Footer'))
const SignUp = lazy(() => import('./pages/auth/SignUp'))
const SignIn = lazy(() => import('./pages/auth/SignIn'))
const SignupSuccess = lazy(() => import('./pages/auth/SignupSuccess'))
const Navbar = lazy(() => import('./components/nav/Navbar'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const SignupComplete = lazy(() => import('./pages/auth/SignUpComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const History = lazy(() => import('./pages/user/History'))
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const AccountIssue = lazy(() => import('./pages/user/AccountIssue'))
const UserRoute = lazy(() => import('./routes/UserRoute'))
const AdminRoute = lazy(() => import('./routes/AdminRoute'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

const ChoiceCreate = lazy(() => import('./pages/admin/choice/ChoiceCreate'))
const ChoiceUpdate = lazy(() => import('./pages/admin/choice/ChoiceUpdate'))
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'))
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'))
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'))
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'))
const Product = lazy(() => import('./pages/Product'))
const Shop = lazy(() => import('./pages/Shop'))
const Menu = lazy(() => import('./pages/Menu'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CashPayment = lazy(() => import('./pages/CashPayment'))
const CreateCouponPage = lazy(() => import('./pages/admin/coupon/CreateCouponPage'))
const Payment = lazy(() => import('./pages/Payment'))

const App = () => {

  const dispatch = useDispatch();
  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        //console.log("user", user);
        currentUser(idTokenResult.token).then(
          res => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
              }
            })
          }
        ).catch(err => console.log(err))
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className='col text-center p-5'>
        <CircularProgress style={{color: '#14213d'}}/><br />
        <Typography style={{color: '#14213d', fontFamily: 'Nunito', fontSize: '1rem'}}>Loading...</Typography>
      </div>

    }>
      <ThemeProvider theme={theme}>
      <div style={{minHeight: '100vh', paddingBottom: '70px'}}>
        <Navbar position='fixed' />
        <SideDrawer />
        <ToastContainer
          style={{fontFamily: 'Nunito', fontSize: '1rem'}}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          
        />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/sign-up/complete' component={SignupComplete} />
          <Route exact path='/forgot/password' component={ForgotPassword} />
          <Route exact path='/product/:slug' component={Product} />
          <Route exact path='/category/:slug' component={CategoryHome} />
          <Route exact path='/sub/:slug' component={SubHome} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/menu' component={Menu} />
          <Route exact path='/cart' component={Cart} />


          <UserRoute exact path='/user/history' component={History} />
          <UserRoute exact path='/user/password' component={Password} />
          <UserRoute exact path='/user/wishlist' component={Wishlist} />
          <UserRoute exact path='/user/account-issue' component={AccountIssue} />
          <UserRoute exact path='/checkout' component={Checkout} />
          <UserRoute exact path='/payment' component={Payment} />
          <UserRoute exact path='/cash-payment' component={CashPayment} />
          <UserRoute exact path='/signup-success' component={SignupSuccess} />


          <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
          <AdminRoute exact path='/admin/choice' component={ChoiceCreate} />
          <AdminRoute exact path='/admin/choice/:slug' component={ChoiceUpdate} />
          <AdminRoute exact path='/admin/category' component={CategoryCreate} />
          <AdminRoute exact path='/admin/category/:slug' component={CategoryUpdate} />
          <AdminRoute exact path='/admin/sub' component={SubCreate} />
          <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
          <AdminRoute exact path='/admin/product' component={ProductCreate} />
          <AdminRoute exact path='/admin/product/:slug' component={ProductUpdate} />
          <AdminRoute exact path='/admin/products' component={AllProducts} />
          <AdminRoute exact path='/admin/coupon' component={CreateCouponPage} />

        </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
