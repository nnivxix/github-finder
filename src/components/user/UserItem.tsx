import { Link } from "react-router-dom";
import { UsersGithub } from "../../types/schema";

interface UserItemProps {
  user: UsersGithub;
}

function UserItem({ user }: UserItemProps) {
  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div className="avatar">
          <div className="rounded-full shadow w-14 h-14">
            <img src={user.avatar_url} alt={user.login} />
          </div>
        </div>
        <div>
          <h2 className="card-title">{user.login}</h2>
          <Link to={`user/${user.login}`}>Visit Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
