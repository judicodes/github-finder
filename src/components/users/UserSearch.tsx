import React, { useContext, useState } from "react";
import AlertContext, { AlertType } from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubAPICalls";
import GithubContext from "../../context/github/GithubContext";
import { GithubActionType } from "../../context/github/GithubReducer";

function UserSearch() {
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GithubContext);

  const { setAlert } = useContext(AlertContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (text === "") {
      setAlert({
        type: AlertType.Error,
        msg: "Please enter something"
      });
    } else {
      dispatch({ type: GithubActionType.SetLoading });
      const items = await searchUsers(text);
      dispatch({
        type: GithubActionType.GetUsers,
        payload: {
          users: items
        }
      });
      setText("");
    }
  };
  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: GithubActionType.ClearUsers });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-6">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="formControl">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 input input-lg text-black bg-base-200"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users && users.length > 0 && (
        <div>
          <button onClick={handleClear} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
