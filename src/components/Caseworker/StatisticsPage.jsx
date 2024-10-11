import fakeGuestList from "./../../assets/images/fakeGuestList.png";
import useHeader from "./../../hooks/useHeader";

export default function StatisticsPage() {
    const { setHeader } = useHeader();
    setHeader("Statistik");

    return (
        <img
            src={fakeGuestList}
            alt="Fake Guest List"
            className="mx-auto w-10/12"
        />
    )
}