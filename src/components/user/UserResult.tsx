import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { UserGithub } from "../../types/schema";
import UserItem from "./UserItem";
function UserResult() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_GITHUB_API_URL as string}/users`,
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN as string}`,
        },
      }
    );
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

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
