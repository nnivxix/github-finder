import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-6xl text-center">Opps</h1>
      <h2 className="text-3xl text-center py-3">
        The page you request is not found
      </h2>
      <Link to="/" className="btn">
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
