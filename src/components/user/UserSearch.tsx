import React, { useState } from "react";
import { CgCloseR } from "react-icons/cg";

function UserSearch() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") {
      alert("please input something");
    } else {
      // @todo : search user
      setText("");
    }
  };
  const clearInput = () => setText("");
  return (
    <div>
      <form className="flex flex-col md:flex-row" onSubmit={handleSubmit}>
        <div className="relative md:w-1/2 mb-3 md:mb-0">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search Github user"
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
    </div>
  );
}

export default UserSearch;
