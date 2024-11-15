import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

export const SEO = ({ title, first_name }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="author" content={first_name} />
      <meta name="description" content="NoQ Alla förtjänar en trygg plats" />
      <meta
        name="keywords"
        content="Gäst, Trygg Plats , NoQ, Stockholm utan hemlösa 2024"
      />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  first_name: PropTypes.string,
};

export default SEO;
