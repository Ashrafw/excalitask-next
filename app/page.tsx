import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <div className=" bg-gray-300 text-gray-950 w-screen min-h-screen flex flex-col ">
      <Navbar />
      <MainPage />
    </div>
  );
}
