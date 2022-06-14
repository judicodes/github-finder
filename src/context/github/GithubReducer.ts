import { State, User } from "./GithubContext";

interface Action {
  type: ActionType;
  payload?: User[];
}

export enum ActionType {
  GetUsers,
  ClearUsers,
  SetLoading
}

const githubReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.GetUsers:
      return {
        ...state,
        users: action.payload ?? [],
        isLoading: false
      };
    case ActionType.ClearUsers:
      return {
        ...state,
        users: []
      };
    case ActionType.SetLoading:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default githubReducer;
