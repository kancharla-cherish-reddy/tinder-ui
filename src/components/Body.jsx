import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { adduser, removeuser } from "../utils/userslice";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        const { data } = await api.get("/profile/view");
        if (!cancelled) dispatch(adduser(data));
      } catch {
        if (!cancelled) dispatch(removeuser());
      } finally {
        if (!cancelled) setAuthChecked(true);
      }
    };

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!authChecked) return;

    if (!user && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    } else if (user && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [authChecked, location.pathname, navigate, user]);

  return (
    <div className="app-shell flex flex-col">
      <Navbar />

      <main className="page-main">
        {authChecked ? <Outlet /> : <p role="status" className="status-state">Checking your session…</p>}
      </main>

      <Footer />
    </div>
  );
};

export default Body;
