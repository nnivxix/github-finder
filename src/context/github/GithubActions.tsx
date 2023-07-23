import { UserGithub } from "../../types/schema";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const searchUsers = async (text: string) => {
  const response = await fetch(
    `${GITHUB_API_URL as string}/search/users?q=${text}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN as string}`,
      },
    }
  );
  const { items }: { items: UserGithub[] } = await response.json();

  return items;
};
