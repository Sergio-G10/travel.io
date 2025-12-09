import '../index.css'
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

function Nav() {
  // Verify if user is logged in an change NAV UI depending on that
  
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-auth-container">
        <Link className="brand-name" to="/">travel.io</Link>
        <div className="navbar-nav profile-links">
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="logout">Log Out</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav
