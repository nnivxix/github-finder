import { Link } from "react-router-dom";
import { DiGithubBadge } from "react-icons/di";

function Navbar() {
  return (
    <nav className="navbar bg-dark-gh text-white shadow-lg mb-12 flex justify-between">
      <div className="flex-none px-2 mx-2">
        <DiGithubBadge className="text-2xl" />
        <Link to="/" className="text-lg font-bold align-middle">
          <h1>Github Finder</h1>
        </Link>
      </div>
      <div className=" px-2 mx-2">
        <div className="flex-justify-end">
          <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
            Home
          </Link>
          <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
