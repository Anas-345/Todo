import { useAuth } from "../context/AuthContextProvider";

export default function Home() {
  const { users } = useAuth();

  const activeUser = users.find((u) => u.active);

  return <>
  <h2>Welcome {activeUser.name}</h2>
  </>;
}
