import { AiFillEye, AiFillStar } from "react-icons/ai";
import { FaCodeFork } from "react-icons/fa6";
import { UserRepo } from "../../types/schema";

interface RepositoryItemProps {
  repo: UserRepo;
}
function RepositoryItem({ repo }: RepositoryItemProps) {
  return (
    <div className="card hover:bg-slate-800 col-span-3 md:col-span-1 ">
      <div className="card-body shadow-lg">
        <h1 className="text-xl font-semibold">
          <a href={repo.html_url} target="_blank">
            {repo.name}
          </a>
        </h1>
        <p>{repo.description}</p>
        <div className="flex">
          <div className="px-3">
            <AiFillEye />
            {repo.watchers_count}
          </div>
          <div className="px-3">
            <AiFillStar />
            {repo.stargazers_count}
          </div>
          <div className="px-3">
            <FaCodeFork />
            {repo.forks ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepositoryItem;
