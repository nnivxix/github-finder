import { useReducer, createContext, ReactNode } from "react";
import alertReducer from "./AlertReducer";

interface AlertContextProps {
  alert: {
    message: string;
    type: string;
  };
  setAlert: (message: string, type: string) => void;
}

const AlertContext = createContext<AlertContextProps>({
  alert: {
    message: "",
    type: "",
  },
  setAlert: () => null,
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const initialState = {
    alert: {
      message: "",
      type: "",
    },
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);
  const setAlert = (message: string, type: string) => {
    dispatch({
      type: "SET_ALERT",
      payload: {
        alert: { message, type },
      },
    });
    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
