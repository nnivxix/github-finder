import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
import { IoMdCloseCircle } from "react-icons/io";
function Alert() {
  const { alert } = useContext(AlertContext);
  return (
    alert.message !== "" && (
      <p className="flex items-center mb-4 space-x-2">
        {alert.type === "error" && <IoMdCloseCircle color="rgb(166, 34, 57)" />}
        <span className="flex-1 text-base font-semibold leading-7 text-white">
          <strong>{alert.message}</strong>
        </span>
      </p>
    )
  );
}

export default Alert;
