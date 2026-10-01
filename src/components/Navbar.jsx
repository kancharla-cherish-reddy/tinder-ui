import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeuser } from "../utils/userslice";
import api from "../utils/api";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      navigate("/login");
      dispatch(removeuser());
    } catch {
      // Keep the current session visible if sign-out could not reach the server.
    }
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="DevTinder home">
          <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span>devtinder</span>
        </Link>
        {user && <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Discover</NavLink>
          <NavLink to="/requests" className={({ isActive }) => isActive ? "active" : ""}>Requests</NavLink>
          <NavLink to="/connections" className={({ isActive }) => isActive ? "active" : ""}>Connections</NavLink>
        </nav>}
        {user && <div className="account-area">
          <span className="account-name">{user?.firstname}</span>
          <Link to="/profile" className="avatar-button" aria-label="Edit your profile">
            <img alt="" src={user?.photourl || "https://placehold.co/80x80/e5f4ef/087f70?text=Dev"} />
          </Link>
          <button className="logout-button" onClick={handleLogout}>Log out</button>
        </div>}
      </div>
    </header>
  );
};

export default Navbar;
