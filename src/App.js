import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import MainLayout from './layouts/MainLayout';
import EditProduct from './pages/EditProduct';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/profile',
          element:<Profile></Profile>
        },
        {
          path:'/products',
          element:<Products></Products>
        },
        {
          path:'/add-product',
          element:<AddProduct></AddProduct>
        },
        {
          path:'/product/edit/:id',
          element:<EditProduct></EditProduct>,
          loader:({params})=>fetch(`${process.env.REACT_APP_API_URL}/product/${params.id}`)
        },
      ]
    }
  ])
  return (
    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
