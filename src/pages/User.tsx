import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";

function User() {
  const { login } = useParams();
  const { user, getUser } = useContext(GithubContext);

  useEffect(() => {
    getUser(login as string);
  }, []);

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar_url} alt={`${user.name}'s image`} />
    </div>
  );
}

export default User;
