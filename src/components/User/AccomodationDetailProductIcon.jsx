import singlerum from "../../assets/AccommodationIcons/single-bed.png";
import sovsal from "../../assets/AccommodationIcons/bunk-bed.png";
import shower from "../../assets/AccommodationIcons/shower.png";
import washingMachine from "../../assets/AccommodationIcons/washing-maskin.png";
import cleaning from "../../assets/AccommodationIcons/cleaning.png";
import locker from "../../assets/AccommodationIcons/locker.png";
import cutlery from "../../assets/AccommodationIcons/cutlery.png";
import PropTypes from "prop-types";

const AccomodationDetailProductIcon = ({ category }) => {
  AccomodationDetailProductIcon.propTypes = {
    category: PropTypes.string.isRequired,
  };

  // define all amenities
  const allAmenities = [
    { type: "room", icon: sovsal, label: "Room", category: "Rum" },
    {
      type: "Room",
      icon: singlerum,
      label: "Room",
      category: "Rum",
    },
    {
      type: "washingmachine",
      icon: washingMachine,
      label: "Washing Machine",
      category: "Hygien",
    },
    {
      type: "hygieneproducts",
      icon: cleaning,
      label: "Hygiene Products",
      category: "Hygien",
    },
    { type: "storage", icon: locker, label: "Storage", category: "Övrigt" },
    { type: "breakfast", icon: cutlery, label: "Breakfast", category: "Mat" },
    { type: "dinner", icon: cutlery, label: "Dinner", category: "Mat" },
    { type: "shower", icon: shower, label: "Shower", category: "Hygien" },
  ];

  // filter amenities
  const filteredAmenities = allAmenities.filter(
    (amenity) => amenity.category === category
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-">
      {filteredAmenities.map((amenity, index) => (
        <div
          key={index}
          className="flex flex-col justify-start items-start gap-6"
        >
          <div className="flex flex-row gap-2">
            <img
              src={amenity.icon}
              alt={amenity.type}
              className="accommodation_amenities_display_image"
            />
            <p className="accommodation_amenities_display_paragraph">
              {amenity.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccomodationDetailProductIcon;
