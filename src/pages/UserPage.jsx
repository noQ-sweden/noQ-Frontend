import AccommodationList from "./../components/User/AccommodationList";
import AccommodationPanel from "../components/User/AccommodationPanel";
import SEO from "../components/SEO";

export default function UserPage() {
  return (
    <>
      <SEO title={`Användare | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div className="mr-8 sm:mr-3" id="UserPage">
        <AccommodationPanel title="Välj boställe">
          <AccommodationList />
        </AccommodationPanel>
      </div>
    </>
  );
}
