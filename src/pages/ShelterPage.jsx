import React from "react";
// import axios from './../api/AxiosNoqApi';
import ShelterPagesListItem from "../components/ShelterPage/ShelterPagesListItem.jsx";
import TabGeneralInfo from "../components/ShelterPage/TabGeneralInfo.jsx";
import SEO from "../components/SEO";

const ShelterPage = () => {
  return (
    <>
      <SEO title={`Bostället | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div className="px-8 py-6">
        <h1 className="font-inter text-4xl font-bold leading-tight">
          Redigera härbärge
        </h1>
        <ul>
          <ShelterPagesListItem itemTitle="Allmän information">
            <TabGeneralInfo />
          </ShelterPagesListItem>
          <ShelterPagesListItem itemTitle="Typ av sovplats" />
          <ShelterPagesListItem itemTitle="Sovplatser" />
          <ShelterPagesListItem itemTitle="Tjänster" />
          <ShelterPagesListItem itemTitle="Övrig information" />
        </ul>
      </div>
    </>
  );
};

export default ShelterPage;
