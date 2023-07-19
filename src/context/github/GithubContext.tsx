import { useReducer, createContext, ReactNode } from "react";
import { UserGithub, UsersGithub } from "../../types/schema";
import githubReducer from "./GithubReducer";

interface GithubContextProps {
  users: UsersGithub[];
  user: UserGithub;
  loading: boolean;
  clearUsers: () => void;
  searchUsers: (text: string) => Promise<void>;
  getUser: (login: string) => Promise<void>;
}
const initUserGithub = {
  users: [],
  user: {
    login: "",
    id: 0,
    node_id: "",
    avatar_url: "",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "",
    site_admin: false,
    name: "",
    company: "",
    blog: "",
    location: "",
    email: "",
    hireable: false,
    bio: "",
    twitter_username: "",
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: "",
    updated_at: "",
  },
  loading: false,
};
const GithubContext = createContext<GithubContextProps>({
  ...initUserGithub,
  clearUsers: () => null,
  searchUsers: async () => {},
  getUser: async () => {},
});

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(githubReducer, initUserGithub);

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
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
