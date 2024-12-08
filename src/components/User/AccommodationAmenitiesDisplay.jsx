import AccomodationDetailProductIcon from "./AccomodationDetailProductIcon";
import PropTypes from "prop-types";

export default function AccommodationAmenitiesDisplay({ title, products }) {
  AccommodationAmenitiesDisplay.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
  };

  const productCount = products.length > 0 ? products.length : null;

  return (
    <>
      {productCount ? (
        <>
          <p className="text-base font-bold grid justify-items-start">
            {title}
          </p>
          <div className={`grid md:grid-cols-5 gap-2 md:gap-5`}>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-start items-start gap-6"
              >
                <div className="flex flex-col">
                  <AccomodationDetailProductIcon type={product.type} />
                  <p className="accommodation_amenities_display_paragraph">
                    {product.name}
                  </p>
                </div>
                {product.features && product.features.length > 0 && (
                  <ul className="list-disc ml-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="pb-5">
                        <span className="font-bold mr-2">{feature.label}:</span>{" "}
                        {feature.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p />
      )}
    </>
  );
}
