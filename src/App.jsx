
import './App.css'

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import RegPage from './pages/RegPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loginpage from './pages/Loginpage';
import Home from './pages/Home';



function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route
        path="/"
        element={<RegPage />}
      ></Route>

      <Route
        path="/login"
        element={<Loginpage />}
      ></Route>

      <Route
        path="/home"
        element={<Home />}
      ></Route>
      </>
    )
  );

  return (
    <>
    
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
      <RouterProvider router={router} />
    </>
  )
}

export default App
