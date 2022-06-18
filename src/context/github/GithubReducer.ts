import { GithubState, Repo, User } from "./GithubContext";

interface GithubAction {
  type: GithubActionType;
  payload?: {
    users?: User[];
    user?: User;
    userRepos?: Repo[];
  };
}

export enum GithubActionType {
  GetUsers,
  GetUser,
  ClearUsers,
  SetLoading,
  StopLoading
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
    case GithubActionType.StopLoading:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default githubReducer;
