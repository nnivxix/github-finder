import UserResult from "../components/user/UserResult";
import UserSearch from "../components/user/UserSearch";
import { GithubProvider } from "../context/GithubContext";

function Home() {
  return (
    <GithubProvider>
      <UserSearch />
      <UserResult />
    </GithubProvider>
  );
}

export default Home;
