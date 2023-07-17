import { useContext, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { UserGithub } from "../../types/schema";
import UserItem from "./UserItem";
import GithubContext from "../../context/GithubContext";
function UserResult() {
  const { users, loading, getUsers } = useContext(GithubContext);

  useEffect(() => {
    getUsers();
  }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user: UserGithub) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }

  return <CgSpinner className="animate-spin" />;
}

export default UserResult;
