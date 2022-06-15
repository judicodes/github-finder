import { createContext, useReducer } from "react";
import githubReducer, { GithubActionType } from "./GithubReducer";

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

export interface GithubState {
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
      payload: items
    });
  };

  const clearUsers = () => {
    dispatch({ type: GithubActionType.ClearUsers });
  };

  const setLoading = () => dispatch({ type: GithubActionType.SetLoading });

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
