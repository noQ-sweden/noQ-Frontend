import React from "react";
import { Helmet } from "react-helmet";

export const SEO = ({ title, description, first_name }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={first_name} />
      <meta name="description" content="NoQ Alla förtjänar en trygg plats" />
      <meta
        name="keywords"
        content="Gäst, Trygg Plats , NoQ, Stockholm utan hemlösa 2024"
      />
      {first_name && <meta name="author" content={first_name} />}
    </Helmet>
  );
};

export default SEO;
