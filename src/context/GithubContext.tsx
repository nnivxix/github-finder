import { useReducer, createContext, ReactNode } from "react";
import { UserGithub } from "../types/schema";
import githubReducer from "./GithubReducer";

interface GithubContextProps {
  users: UserGithub[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
}
const GithubContext = createContext<GithubContextProps>({
  users: [],
  loading: false,
  searchUsers: async () => {},
});

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  const searchUsers = async (text: string) => {
    setLoading();

    const response = await fetch(
      `${GITHUB_API_URL as string}/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN as string}`,
        },
      }
    );
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
