import singlerum  from "../../assets/AccommodationIcons/single-bed.png";
import sovsal  from "../../assets/AccommodationIcons/bunk-bed.png";
import shower from "../../assets/AccommodationIcons/shower.png";
import washingMachine from "../../assets/AccommodationIcons/washing-maskin.png";
import cleaning from "../../assets/AccommodationIcons/cleaning.png";
import locker from "../../assets/AccommodationIcons/locker.png";
import cutlery from "../../assets/AccommodationIcons/cutlery.png";
import PropTypes from "prop-types";

const AccomodationDetailProductIcon = ({ type }) => {
    AccomodationDetailProductIcon.propTypes = {
        type: PropTypes.string.isRequired,
    };
    const renderContent = () => {
        switch (type) {
            case 'room':
                return <img src={sovsal} alt={type} className="accommodation_amenities_display_image" />;
            case 'woman-only':
                return <img src={singlerum} alt={type} className="accommodation_amenities_display_image" />;
            case 'washingmachine':
                return <img src={washingMachine} alt={type} className="accommodation_amenities_display_image" />;
            case 'hygieneproducts':
                return <img src={cleaning} alt={type} className="accommodation_amenities_display_image" />;
            case 'storage':
                return <img src={locker} alt={type} className="accommodation_amenities_display_image" />;
            case 'breakfast':
                return <img src={cutlery} alt={type} className="accommodation_amenities_display_image" />;
            case 'dinner':
                return <img src={cutlery} alt={type} className="accommodation_amenities_display_image" />;
            case 'shower':
                return <img src={shower} alt={type} className="accommodation_amenities_display_image" />;
            default:
                return <p></p>;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};
export default AccomodationDetailProductIcon;