import { createContext, useReducer } from "react";
import githubReducer, { ActionType } from "./GithubReducer";

interface Context {
  users: User[];
  isLoading: boolean;
  searchUsers: (text: string) => void;
  clearUsers: () => void;
}

export interface User {
  id: number;
  login: string;
  avatar_url: string;
}

export interface State {
  users: User[];
  isLoading: boolean;
}

const GithubContext = createContext<Context>({
  users: [],
  isLoading: true,
  searchUsers: (_) => {},
  clearUsers: () => {}
});
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: any) => {
  const initialState: State = { users: [], isLoading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    const { items } = await response.json();
    dispatch({
      type: ActionType.GetUsers,
      payload: items
    });
  };

  const clearUsers = () => {
    dispatch({ type: ActionType.ClearUsers });
  };

  const setLoading = () => dispatch({ type: ActionType.SetLoading });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
