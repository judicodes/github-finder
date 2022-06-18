import { Link } from "react-router-dom";

interface Props {
  login: string;
  avatarUrl: string;
}

function UserItem({ login, avatarUrl }: Props) {
  return (
    <div className="card shadow-md compact side bg-base-200 p-3">
      <div className="flex space-x-4 items-center card-body">
        <div className="avatar">
          <div className="shadow w-14 h-14 rounded-full">
            <img src={avatarUrl} alt={"Profile picture of" + login} />
          </div>
        </div>
      </div>
      <div>
        <h2 className="card-title">{login}</h2>
        <Link
          to={`/user/${login}`}
          className="text-base-content text-opacity-40"
        >
          Visit Profile
        </Link>
      </div>
    </div>
  );
}

export default UserItem;
