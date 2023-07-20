import { UserRepo } from "../../types/schema";
import RepositoryItem from "./RepositoryItem";

interface RepositoryListProps {
  repos: UserRepo[];
}

function RepositoryList({ repos }: RepositoryListProps) {
  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold">Latest Repositories</h1>
      <div className="grid grid-cols-3">
        {repos.map((repo) => (
          <RepositoryItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default RepositoryList;
