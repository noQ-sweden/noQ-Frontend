import React, { useEffect, useState, useContext } from "react";
import AccommodationPanel from "./AccommodationPanel";
import AccommodationAmenitiesDisplay from "./AccommodationAmenitiesDisplay";
import { useParams, Link } from "react-router-dom";
import { AccommodationContext } from "./../../context/AccommodationProvider";
import shelter from "./../../assets/images/genericShelter.png";
import { FaChevronLeft } from "react-icons/fa";

export default function AccommodationDetail() {
  const { accommodation } = useContext(AccommodationContext);
  const params = useParams();
  const [hostProducts, setHostProducts] = useState("");

  useEffect(() => {
    const products = accommodation.filter((item) => item.host.id == params.id);
    setHostProducts(products);
  }, [accommodation, params, setHostProducts]);

  const host = hostProducts.length > 0 ? hostProducts[0].host : null;
  const products = hostProducts.length > 0 ? hostProducts[0].products : null;

  return (
    <>
      <div className="p-3">
        <AccommodationPanel title="Om bostället">
          <div>
            <p
              className="
              font-semibold
              text-lg
              mb-6"
            >
              <Link to={`/user`} className="flex items-center">
                <FaChevronLeft className="mr-2 text-gray-500" />
                Tillbaka
              </Link>
            </p>
            <div
              className=" 
                grid
                gap-6
                rounded
                p-14
                bg-white
                "
            >
              <div className="grid md:grid-cols-3">
                {host ? (
                  <>
                    <img
                      src={shelter}
                      alt={host.name}
                      className="rounded-lg w-52 col-span-1"
                    />
                    <div className=" md:col-span-2 ">
                      <p className="text-base font-bold grid justify-items-start">
                        {host.name}
                      </p>
                      <p className="text-sm grid justify-items-start">
                        {host.street}
                      </p>
                      <p className="text-sm grid justify-items-start">
                        {host.city}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-base font-bold grid justify-items-start">
                    Host not found
                  </p>
                )}
              </div>

              <div className="grid gap-4">
                <div className="grid gap-6">
                  {products ? (
                    <>
                      <p className="w-4/5 font-semibold">
                        Bostället kräver ett biståndsbeslut som du får av din
                        stadsdelsförvaltning eller socialjouren. Endast för
                        akutbistånd på kvällar, nätter och helger. Du får hjälp
                        med detta om du är på plats.
                      </p>
                      <p className="text-base font-bold grid justify-items-start ">
                        Vad vi erbjuder
                      </p>
                      <AccommodationAmenitiesDisplay
                        title={"Rum"}
                        products={products.filter(
                          (item) =>
                            item.type == "room" || item.type == "woman-only"
                        )}
                      />
                      <AccommodationAmenitiesDisplay
                        title={"Hygien"}
                        products={products.filter(
                          (item) => item.type == "hygieneproducts"
                        )}
                      />
                      <AccommodationAmenitiesDisplay
                        title={"Mat"}
                        products={products.filter(
                          (item) =>
                            item.type == "breakfast" || item.type == "dinner"
                        )}
                      />
                      <AccommodationAmenitiesDisplay
                        title={"Övrigt"}
                        products={products.filter(
                          (item) => item.type == "storage"
                        )}
                      />
                    </>
                  ) : (
                    <p className="text-base font-bold grid justify-items-start">
                      Boställen har inga produkter.
                    </p>
                  )}
                </div>
                <div className="grid  gap-3 justify-end">
                  <div>
                    {host ? (
                      <>
                        <Link to={`/accommodations/${host.id}/booking`}>
                          <button
                            className="
                                          bg-green-600
                                          hover:bg-green-700
                                          text-white
                                          font-semibold
                                          text-m
                                          align-middle
                                          w-24
                                          h-10
                                          rounded
                                          focus:outline-none
                                          focus:shadow-outline"
                          >
                            Välj
                          </button>
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <p
                      className="
                    font-semibold
                    text-xs
                    sm:text-sm"
                    >
                      <Link to={`/user`} className="flex items-center">
                        <FaChevronLeft className="mr-2 text-gray-500" />
                        Tillbaka
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccommodationPanel>
      </div>
    </>
  );
}
