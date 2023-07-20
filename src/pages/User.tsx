import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserGroup, FaBookBookmark, FaBook } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";
import RepositoryList from "../components/repositories/RepositoryList";

function User() {
  const { login } = useParams();
  const { user, getUser, getUserRepos, repos } = useContext(GithubContext);

  useEffect(() => {
    getUser(login as string);
    getUserRepos(login as string);
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <img
          className="mr-7  "
          // width="100px"
          src={user.avatar_url}
          alt={`${user.name}'s image`}
        />
        <div className="">
          <h1
            className="text-4xl font-bold hover:underline"
            title="click to visit profile"
          >
            <a href={user.html_url} target="_blank">
              {" "}
              {user.name}
            </a>{" "}
            {user.hireable && (
              <span className="text-green-800 bg-green-300 p-1 opacity-30 text-sm ">
                Hire me
              </span>
            )}
          </h1>
          <p className="text-lg">Live at: {user.location}</p>
          <p className="text-lg">bio: {user.bio}</p>
          {user.company && (
            <a
              className="text-lg underline"
              target="_blank"
              href={`https://github.com/${user.company.slice(1)}`}
            >
              work at: {user.company}
            </a>
          )}
          <div className="grid grid-cols-4 my-3 gap-3">
            <div className="md:col-span-1 col-span-2">
              <FaUserGroup />
              <h1>
                Followers:<strong> {user.followers}</strong>
              </h1>
            </div>
            <div className="md:col-span-1 col-span-2">
              <FaUserGroup />
              <h1>
                Followings: <strong> {user.following}</strong>
              </h1>
            </div>
            <div className="md:col-span-1 col-span-2">
              <FaBookBookmark />
              <h1>
                Repositories: <strong> {user.public_repos}</strong>
              </h1>
            </div>
            <div className="md:col-span-1 col-span-2">
              <FaBook />
              <h1>
                Gists: <strong> {user.public_gists}</strong>
              </h1>
            </div>
          </div>
          <button className="btn">
            <Link to="/"> Back To Home</Link>
          </button>
        </div>
      </div>
      <div>
        <RepositoryList repos={repos} />
      </div>
    </div>
  );
}

export default User;
