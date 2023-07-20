import { useReducer, createContext, ReactNode } from "react";
import { UserGithub, UsersGithub, UserRepo } from "../../types/schema";
import githubReducer from "./GithubReducer";
import InitialState from "./InitialState";

interface GithubContextProps {
  users: UsersGithub[];
  user: UserGithub;
  repos: UserRepo[];
  loading: boolean;
  clearUsers: () => void;
  searchUsers: (text: string) => Promise<void>;
  getUser: (login: string) => Promise<void>;
  getUserRepos: (login: string) => Promise<void>;
}

const GithubContext = createContext<GithubContextProps>({
  ...InitialState,
  clearUsers: () => null,
  searchUsers: async () => {},
  getUser: async () => {},
  getUserRepos: async () => {},
});

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(githubReducer, InitialState);

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
  const getUser = async (login: string) => {
    setLoading();

    const response = await fetch(`${GITHUB_API_URL as string}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN as string}`,
      },
    });
    const data = await response.json();
    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };
  const getUserRepos = async (login: string) => {
    setLoading();

    const response = await fetch(
      `${
        GITHUB_API_URL as string
      }/users/${login}/repos?sort=updated&per_page=10`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN as string}`,
        },
      }
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
