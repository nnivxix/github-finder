import React, { useState, useContext } from "react";
import { CgCloseR } from "react-icons/cg";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";
import { UserGithub } from "../../types/schema";

function UserSearch() {
  const { users, inputSearch, dispatch } = useContext(GithubContext);
  const [text, setText] = useState(inputSearch);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
      return;
    }

    dispatch({
      type: "INPUT_SEARCH",
      payload: text,
    });

    dispatch({ type: "SET_LOADING" });
    const users: UserGithub[] = await searchUsers(text);
    dispatch({
      type: "GET_USERS",
      payload: users,
    });
    return users;
  };

  const clearInput = () => {
    dispatch({ type: "CLEAR_INPUT_SEARCH" });
    setText("");
  };

  return (
    <div className="mb-9">
      <form className="flex flex-col md:flex-row" onSubmit={handleSubmit}>
        <div className="relative md:w-1/2 mb-3 md:mb-0">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search Github username ex:nnivxix"
            value={text}
            className=" w-full placeholder:text-gray-600 text-dark-gh  md:rounded-r-none md:rounded-bl-lg md:rounded-b-none bg-gray-200 input-md input md:input-lg "
          />
          {text !== "" && (
            <CgCloseR
              onClick={clearInput}
              color="#191e24"
              size="24px"
              className="absolute cursor-pointer h-full inset-y-0 right-2"
            />
          )}
        </div>
        <button
          type="submit"
          className=" md:rounded-l-none mb-3 md:mb-0  w-full md:w-36 btn btn-md  md:btn-lg"
        >
          Search
        </button>
      </form>
      <button
        onClick={() => {
          dispatch({ type: "CLEAR_USERS" });
          dispatch({ type: "CLEAR_INPUT_SEARCH" });
          clearInput();
        }}
        type="button"
        disabled={users.length ? false : true}
        className="mb-3 md:mb-0 md:w-1/4 w-full btn bg-gray-500 text-gray-900 hover:text-white btn-md  md:btn-lg"
      >
        Clear Result
      </button>
    </div>
  );
}

export default UserSearch;
