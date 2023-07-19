import { useContext } from "react";
import { CgSpinner } from "react-icons/cg";
import { UserGithub } from "../../types/schema";
import UserItem from "./UserItem";
import GithubContext from "../../context/GithubContext";
function UserResult() {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 bg-base-100 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user: UserGithub) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <CgSpinner size="32px" className="animate-spin" />
      <p>Please Waiting...</p>
    </div>
  );
}

export default UserResult;
