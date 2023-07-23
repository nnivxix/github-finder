import axios from "axios";
import { UserGithub } from "../../types/schema";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_API_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN as string}` },
});

export const searchUsers = async (text: string) => {
  const response = await github.get(
    `${GITHUB_API_URL as string}/search/users?q=${text}`
  );
  const { items }: { items: UserGithub[] } = response.data;

  return items;
};

export const getUserAndRepos = async (login: string) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?sort=updated&per_page=10`),
  ]);
  return { user: user.data, repos: repos.data };
};
