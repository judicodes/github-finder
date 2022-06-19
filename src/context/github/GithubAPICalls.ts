import { UserData } from "../../pages/User";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const searchUsers = async (text: string) => {
  const params = new URLSearchParams({ q: text });
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
  const { items } = await response.json();
  return items;
};

export const getUserAndRepos = async (
  login: string
): Promise<UserData | null> => {
  const responseUser = await fetch(`${GITHUB_URL}/users/${login}`);
  const reposParams = new URLSearchParams({
    sort: "created",
    per_page: "10"
  });
  const responseRepos = await fetch(
    `${GITHUB_URL}/users/${login}/repos?${reposParams}`
  );

  if (responseUser.status === 404 || responseRepos.status === 404) {
    window.location.href = "/notfound";
    return null;
  } else {
    const user = await responseUser.json();
    const repos = await responseRepos.json();
    return { ...user, repos };
  }
};
