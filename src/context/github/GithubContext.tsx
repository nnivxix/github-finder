import { useReducer, createContext, ReactNode } from "react";
import { UserGithub, UsersGithub, UserRepo } from "../../types/schema";
import githubReducer from "./GithubReducer";
import InitialState from "./InitialState";

interface GithubContextProps {
  users: UsersGithub[];
  user: UserGithub;
  repos: UserRepo[];
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
  clearUsers: () => void;
  getUser: (login: string) => Promise<void>;
  getUserRepos: (login: string) => Promise<void>;
}

const GithubContext = createContext<GithubContextProps>({
  ...InitialState,
  dispatch: () => null,
  clearUsers: () => null,
  getUser: async () => {},
  getUserRepos: async () => {},
});

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(githubReducer, InitialState);

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
        ...state,
        dispatch,
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
