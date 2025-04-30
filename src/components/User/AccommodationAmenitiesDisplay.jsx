import AccomodationDetailProductIcon from "./AccomodationDetailProductIcon";
import PropTypes from "prop-types";

export default function AccommodationAmenitiesDisplay({ title }) {
  AccommodationAmenitiesDisplay.propTypes = {
    title: PropTypes.string.isRequired,
  };

  return (
    <>
      <p className="text-base font-bold grid justify-items-start">{title}</p>

      <AccomodationDetailProductIcon category={title} />
    </>
  );
}
