import AccommodationList from "./../components/User/AccommodationList";
import AccommodationPanel from "../components/User/AccommodationPanel";

export default function UserPage() {
    return (
        <>
            <div className="mr-8 sm:mr-3" id="UserPage">
                <AccommodationPanel title="Välj boställe">
                        <AccommodationList />
                </AccommodationPanel>
            </div>
        </>
  );
}
