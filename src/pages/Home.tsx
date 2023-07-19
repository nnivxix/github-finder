import UserResult from "../components/user/UserResult";
import UserSearch from "../components/user/UserSearch";
import { AlertProvider } from "../context/alert/AlertContext";
import { GithubProvider } from "../context/github/GithubContext";
import Alert from "../components/Alert";

function Home() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Alert />
        <UserSearch />
        <UserResult />
      </AlertProvider>
    </GithubProvider>
  );
}

export default Home;
