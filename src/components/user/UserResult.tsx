import { useEffect, useState } from "react";

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

  return <div></div>;
}

export default UserResult;
