import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "../../api/AxiosNoqApi.js";
import { AccommodationContext } from "../../context/AccommodationProvider";
import shelter from "./../../assets/images/genericShelter.png";
import { FaChevronLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import AccommodationPanel from "./AccommodationPanel";
import AccommodationAmenitiesDisplay from "./AccommodationAmenitiesDisplay";

export default function AccommodationDetail() {
  const { accommodation } = useContext(AccommodationContext);
  const params = useParams();
  const [ t ] = useTranslation();
  const location = useLocation();
  const { startDate, endDate } = location.state || {};

  const [hostProducts, setHostProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [missingDatesError, setMissingDatesError] = useState(false);

  useEffect(() => {
    const products = accommodation.filter((item) => item.host.id == params.id);
    setHostProducts(products);
  }, [accommodation, params]);

  const host = hostProducts.length > 0 ? hostProducts[0].host : null;
  const products = hostProducts.length > 0 ? hostProducts[0].products : null;

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setMissingDatesError(true);
      return;
    }

    setLoading(true);

    const payload = {
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    };

    try {
      const response = await axios.post("/api/user/request_booking", payload);

      if (response.status === 200) {
        setBookingSuccessful(true);
      } else {
        setBookingSuccessful(false);
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Error Booking:", error);
      setBookingSuccessful(false);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-12 text-[#39352E] relative">
      <AccommodationPanel title={t('AccommodationPanel.About')}>
        <div>
          <p className="font-semibold text-lg mb-2">
            <Link to={`/user`} className="flex items-center">
              <FaChevronLeft className="mr-2 text-gray-500" />
              {t('ActionButtons.Back')}
            </Link>
          </p>

          <div className="grid  px-4 py-4 bg-white border border-gray-300 rounded-xl">
            <div className="grid md:grid-col-3">
              {host ? (
                <>
                  <div className="flex justify-center py-6">
                    <img
                      src={shelter}
                      alt={host.name}
                      className="rounded-lg w-36 col-span-1"
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg ">{host.name}</h1>
                    <div className="flex justify-between items-center py-4 lg:pr-48">
                      <div>
                        <p className="text-sm grid justify-items-start">
                          {host.street}, {host.city}
                        </p>
                      </div>

                      <div>
                        <button className="bg-[#D9D9D9] text-[#496D44] font-light rounded-full px-3">
                          {t('ActionButtons.Map')}
                        </button>
                      </div>
                    </div>
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
                    <p className=" font-medium">
                      Bostället kräver ett biståndsbeslut som du får av din
                      stadsdelsförvaltning eller socialjouren. Endast för
                      akutbistånd på kvällar, nätter och helger. Du får hjälp
                      med detta om du är på plats.
                    </p>
                    <p className="text-base font-semibold  grid justify-items-start">
                      Vad vi erbjuder
                    </p>
                    <AccommodationAmenitiesDisplay
                      title="Rum"
                    />
                    <AccommodationAmenitiesDisplay
                      title="Hygien"
                      products={products.filter(
                        (item) => item.type === "hygieneproducts"
                      )}
                    />
                    <AccommodationAmenitiesDisplay
                      title="Mat"
                      products={products.filter(
                        (item) =>
                          item.type === "breakfast" || item.type === "dinner"
                      )}
                    />
                    <AccommodationAmenitiesDisplay
                      title="Övrigt"
                      products={products.filter(
                        (item) => item.type === "storage"
                      )}
                    />
                  </>
                ) : (
                  <p className="text-base font-bold grid justify-items-start">
                    Bostället har inga produkter.
                  </p>
                )}
              </div>
              {missingDatesError && (
                <div className="text-red-600 p-3 rounded-md text-center">
                  {t('AccommodationDetail.Error')} {/*Vänligen välj både inchecknings- och utcheckningsdatum.*/}
                </div>
              )}

              {/* submit btn */}
              <div className="grid ">
                {host && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className={`p-3 w-full sm:w-[336px] bg-white text-[#496D44] border border-[#1C4915] rounded-xl ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#f9f9f9]"
                      }`}
                      disabled={loading}
                    >
                      {t('ActionButtons.SendRequest')}
                    </button>
                  </div>
                )}

                {showAlert && (
                  <div className="fixed inset-0 flex items-center justify-center bg-[#FDFDFD] bg-opacity-85">
                    {bookingSuccessful ? (
                      <div className="fixed 0 m-2 flex items-center justify-center bg-[#FDFDFD] bg-opacity-85">
                        <div className="bg-[#FDFDFD] shadow-lg rounded-xl w-[364px] lg:w-[869px] h-[451px] lg:h-[285px] lg:px-16  text-center border border-gray-300">
                          <div className="flex flex-col-reverse lg:flex-row-reverse  justify-center items-center ">
                            <div>
                              <h2 className="text-2xl font-bold mb-4">
                                {t('AccommodationDetail.Success')}{/* Din förfrågan är skickad! */}
                              </h2>
                            </div>
                            <div className="flex justify-center my-4">
                              <svg
                                className="w-18 h-24 text-[#255B57]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-black font-medium mb-6">
                            {t('AccommodationDetail.SuccessMessage')}{/*Vi återkommer med bekräftelse så fort din förfrågan har behandlats.*/}
                          </p>
                          <Link
                            to={`/user`}
                            className="flex items-center justify-center"
                          >
                            <button className=" bg-white text-[#496D44] border border-[#1C4915] hover:bg-[#f9f9f9] font-semibold py-3 px-20  rounded-full">
                              {t('AccommodationDetail.Back')}{/* Tillbaka till start */}
                            </button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      "Bokning misslyckades."
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AccommodationPanel>
    </div>
  );
}
