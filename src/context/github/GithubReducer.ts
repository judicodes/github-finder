import { GithubState, User } from "./GithubContext";

interface GithubAction {
  type: GithubActionType;
  payload?: User[];
}

export enum GithubActionType {
  GetUsers,
  ClearUsers,
  SetLoading
}

const githubReducer = (state: GithubState, action: GithubAction): GithubState => {
  switch (action.type) {
    case GithubActionType.GetUsers:
      return {
        ...state,
        users: action.payload ?? [],
        isLoading: false
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
