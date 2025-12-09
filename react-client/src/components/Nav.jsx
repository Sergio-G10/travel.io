import '../index.css'
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">travel.io</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Nav
