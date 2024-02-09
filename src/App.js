import {
  Route,
  Routes,
  BrowserRouter as Router,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
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
import CreateJournalPage from "./components/CreateJournalPageForm";
import Journals from "./pages/Journals";
import Journal from "./pages/Journal";
import { setJournals, setPages } from "./store/journals.reducer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute redirectTo="/login" />}>
              <Route element={<Navbar />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-journal-page" element={<CreateJournalPage />} />
                <Route path="/journal/:id" element={<Journal />} />
                <Route path="/journals" element={<Journals />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Route>
          </Route>
    </>));


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
        dispatch(setJournals([]));
        dispatch(setPages({}));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return  <RouterProvider router={router} />;
}

export default App;
