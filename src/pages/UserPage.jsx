import AccommodationList from "./../components/User/AccommodationList";
import AccommodationPanel from "../components/User/AccommodationPanel";
import SEO from "../components/SEO";
import useHeader from "../hooks/useHeader";

export default function UserPage() {
  const { setHeader } = useHeader();
  setHeader("Boställen");

  return (
    <>
      <SEO title={`Gäst | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div className="mr-8 sm:mr-3 w-full" id="UserPage">
        <div className="bg-[#245b56] p-8 h-10 flex items-center">
          <img src="src/assets/images/NoqIconWhiteOnGreen.svg" alt="noQ" className="w-24 object-contain"></img>
        </div>
        <AccommodationPanel title="Välj boställe">
          <AccommodationList />
        </AccommodationPanel>
      </div>
    </>
  );
}
