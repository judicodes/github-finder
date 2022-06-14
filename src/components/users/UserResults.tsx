import { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const { users, isLoading } = useContext(GithubContext);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid gap-8 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UserItem
          key={user.id}
          login={user.login}
          avatarUrl={user.avatar_url}
        />
      ))}
    </div>
  );
}

export default UserResults;
