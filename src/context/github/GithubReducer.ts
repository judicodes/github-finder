import { UserData } from "../../pages/User";
import { GithubState } from "./GithubContext";

export interface GithubAction {
  type: GithubActionType;
  payload?: {
    users?: UserData[];
    user?: UserData;
  };
}

export enum GithubActionType {
  GetUsers,
  GetUser,
  ClearUsers,
  SetLoading
}

const githubReducer = (
  state: GithubState,
  action: GithubAction
): GithubState => {
  switch (action.type) {
    case GithubActionType.GetUsers:
      return {
        ...state,
        users: action.payload?.users,
        isLoading: false
      };
    case GithubActionType.GetUser:
      return {
        ...state,
        isLoading: false,
        user: action.payload?.user
      };
    case GithubActionType.ClearUsers:
      return {
        ...state,
        users: []
      };
    case GithubActionType.SetLoading:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default githubReducer;
