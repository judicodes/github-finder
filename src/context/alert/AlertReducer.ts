import { AlertState } from "./AlertContext";

interface AlertAction {
  type: AlertActionType;
  payload?: AlertState;
}

export enum AlertActionType {
  SetAlert,
  ClearAlert
}

const alertReducer = (state: AlertState, action: AlertAction): AlertState => {
  switch (action.type) {
    case AlertActionType.SetAlert:
      return action.payload ?? {};
    case AlertActionType.ClearAlert:
      return {};
    default:
      return state;
  }
};

export default alertReducer;
