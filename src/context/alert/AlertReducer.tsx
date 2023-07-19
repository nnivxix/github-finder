interface AlertState {
  alert: {
    message: string;
    type: string;
  };
}
interface SetAlert {
  type: "SET_ALERT";
  payload: AlertState;
}
interface RemoveAlert {
  type: "REMOVE_ALERT";
}
type AlertAction = SetAlert | RemoveAlert;

const alertReducer = (state: AlertState, action: AlertAction) => {
  switch (action.type) {
    case "SET_ALERT":
      return action.payload;
    case "REMOVE_ALERT":
      return {
        alert: {
          message: "",
          type: "",
        },
      };
    default:
      return state;
  }
};

export default alertReducer;
