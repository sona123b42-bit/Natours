import TourCard from "../_components/TourCard";
import { getTours } from "../_lib/data-service";
import "@/app/_styles/style.css";
export const metadata = {
  title: "Tours",
};
export default async function page() {
  const tours = await getTours();
  // console.log(tours);
  return (
    <div className="natours">
      <main className="bg-[#f7f7f7] w-full mx-auto px-[3rem] py-[4rem] relative min-h-screen flex justify-center">
        <TourCard tours={tours} />
      </main>
    </div>
  );
}
