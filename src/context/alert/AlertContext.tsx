import { createContext, useReducer } from "react";
import alertReducer, { AlertActionType } from "./AlertReducer";

interface Context {
  alert: AlertState;
  setAlert: (state: AlertState) => void;
}

export enum AlertType {
  Error
}

export interface AlertState {
  type?: AlertType;
  msg?: string;
}

const AlertContext = createContext<Context>({} as Context);

export const AlertProvider = ({ children }: any) => {
  const initialState: AlertState = {};
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = ({ type, msg }: AlertState) => {
    dispatch({ type: AlertActionType.SetAlert, payload: { type, msg } });

    setTimeout(() => {
      dispatch({ type: AlertActionType.ClearAlert });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
