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
    message: "",
    type: "",
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);
  const setAlert = (message: string, type: string) => {
    dispatch({
      type: "SET_ALERT",
      payload: { message, type },
    });
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
