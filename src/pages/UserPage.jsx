import AccommodationList from "./../components/User/AccommodationList";
import AccommodationPanel from "../components/User/AccommodationPanel";
import SEO from "../components/SEO";
import useHeader from "../hooks/useHeader";

import { useTranslation } from "react-i18next";

export default function UserPage() {
  const { setHeader } = useHeader();
  const { t, i18n } = useTranslation();

  setHeader("Boställen");

  return (
    <>
      <SEO title={`Gäst | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div className="mr-8 sm:mr-3 w-full pt-20" id="UserPage">
        <AccommodationPanel title={t('AccommodationPanel.Residence')}>
          <AccommodationList />
        </AccommodationPanel>
      </div>
    </>
  );
}
