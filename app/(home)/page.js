import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { User } from "../user";
import Navbar from "../components/navigation/navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-screen'>
        <p>Strona główna</p>
      </section>
    </>
  );
}
