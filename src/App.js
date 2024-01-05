import {
  Route,
  Routes,
  BrowserRouter as Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setIsAuthenticated } from "./store/auth.reducer";
import RegisterPage from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Layout from "./pages/Layout";
import Header from "./components/Header";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return  (<Router>
          {/* <Navbar/> */}
          <Routes>
            <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute redirectTo="/login" />}>
              <Route element={<Navbar />}>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        </Router>);
}

export default App;
