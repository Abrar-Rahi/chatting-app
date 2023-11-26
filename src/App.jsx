
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
import RootLayOut from './components/RootLayOut';
import Message from './pages/Message';
import Notification from './pages/Notification';
import Setting from './pages/Setting';
import Logout from './pages/Logout';



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
        path="/page"
        element={<RootLayOut />}
      >
        <Route
        path="home"
        element={<Home />}
        ></Route>
        
        <Route
        path="msg"
        element={<Message />}
        ></Route>

        <Route
        path="notification"
        element={<Notification />}
        ></Route>

        <Route
        path="setting"
        element={<Setting />}
        ></Route>

        <Route
        path="logout"
        element={<Logout/>}
        ></Route>

      </Route>
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
