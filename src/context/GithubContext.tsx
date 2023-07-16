import { useState, createContext, ReactNode } from "react";
import { UserGithub } from "../types/schema";

interface GithubContextProps {
  users: UserGithub[];
  loading: boolean;
  getUsers: () => Promise<void>;
}
const GithubContext = createContext<GithubContextProps>({
  users: [],
  loading: false,
  getUsers: async () => {},
});

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserGithub[]>([]);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    const response = await fetch(`${GITHUB_API_URL as string}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN as string}`,
      },
    });
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        getUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
