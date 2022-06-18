import { createContext, useReducer } from "react";
import githubReducer, { GithubActionType } from "./GithubReducer";

interface Context {
  users?: User[];
  user?: User;
  isLoading: boolean;
  searchUsers: (text: string) => void;
  getUserAndRepos: (login: string) => void;
  clearUsers: () => void;
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  html_url: string;
  forks: number;
  open_issues: number;
  watchers_count: number;
  stargazers_count: number;
}

export interface User {
  id: number;
  login: string;
  name?: string;
  location?: string;
  type?: string;
  avatar_url: string;
  bio?: string;
  blog?: string;
  twitter_username?: string;
  html_url?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  public_gists?: number;
  hireable?: boolean;
  repos?: Repo[];
}

export interface GithubState {
  users?: User[];
  user?: User;
  isLoading: boolean;
}

const GithubContext = createContext<Context>({
  users: [],
  isLoading: true,
  searchUsers: (_) => {},
  getUserAndRepos: (_) => {},
  clearUsers: () => {}
});
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }: any) => {
  const initialState: GithubState = { users: [], isLoading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await response.json();
    dispatch({
      type: GithubActionType.GetUsers,
      payload: {
        users: items
      }
    });
  };

  const getUserAndRepos = async (login: string) => {
    setLoading();
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
    } else {
      const dataUser = await responseUser.json();
      const repos = await responseRepos.json();
      dispatch({
        type: GithubActionType.GetUser,
        payload: { user: { ...dataUser, repos } }
      });
    }
  };

  const clearUsers = () => {
    dispatch({ type: GithubActionType.ClearUsers });
  };

  const setLoading = () => dispatch({ type: GithubActionType.SetLoading });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        isLoading: state.isLoading,
        searchUsers,
        getUserAndRepos,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
