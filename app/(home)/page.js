import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import MainPanel from "../components/mainPage/mainPanel";
import MainPanel2 from "../components/mainPage/mainPanel2";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>{session ? <MainPanel userId={session.user?.id} /> : <MainPanel2 />}</>
  );
}
