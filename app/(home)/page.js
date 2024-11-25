import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { User } from "../user";
import Navbar from "../components/navigation/navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-screen'>
        <p>Hello world!</p>
      </section>
    </>
  );
}
