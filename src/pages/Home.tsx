import UserResult from "../components/user/UserResult";

function Home() {
  return (
    <div>
      <h1 className="text-6xl">Welcome</h1>
      <p>{import.meta.env.VITE_GITHUB_TOKEN}</p>
      <UserResult />
    </div>
  );
}

export default Home;
