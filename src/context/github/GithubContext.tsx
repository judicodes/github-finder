import { createContext, useReducer } from "react";
import { UserData } from "../../pages/User";
import githubReducer, { GithubAction } from "./GithubReducer";

interface Context {
  users?: UserData[];
  user?: UserData;
  isLoading: boolean;
  dispatch: React.Dispatch<GithubAction>;
}

export interface GithubState {
  users?: UserData[];
  user?: UserData;
  isLoading: boolean;
}

const GithubContext = createContext<Context>({
  users: [],
  isLoading: true,
  dispatch: () => {}
});

export const GithubProvider = ({ children }: any) => {
  const initialState: GithubState = { users: [], isLoading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
