import UserResult from "../components/user/UserResult";
import { GithubProvider } from "../context/GithubContext";

function Home() {
  return (
    <GithubProvider>
      <UserResult />
    </GithubProvider>
  );
}

export default Home;
