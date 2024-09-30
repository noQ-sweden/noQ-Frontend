import AccomodationDetailProductIcon from "./AccomodationDetailProductIcon"
import PropTypes from "prop-types";

export default function AccommodationAmenitiesDisplay({title, products}) {
  AccommodationAmenitiesDisplay.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
  };

  const productCount = products.length > 0 ? products.length : null;
  
  return(
    <>
    {productCount ? (
      <>
        <p className="text-base font-bold grid justify-items-start "> {title}</p>
        <div className={`grid md:grid-cols-5 gap-2 md:gap-5`}>
          {products.map((product) => (
            <div key={product.id} className="flex gap-2">
              <AccomodationDetailProductIcon type={product.type} />
              <p className="accommodation_amenities_display_paragraph">{product.name}</p>
            </div>
          ))}
        </div>  
      </>
    ) : (
      <p/>
    )}
    </>
  )
}