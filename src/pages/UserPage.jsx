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
      <div className="" id="UserPage">
        <AccommodationPanel title="Hitta boende">
          <AccommodationList />
        </AccommodationPanel>
      </div>
    </>
  );
}
