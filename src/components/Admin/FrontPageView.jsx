import axios from "axios";
import { useState, useEffect } from "react";
import {
  activeRequestsHandler,
  arrivalsHandler,
  departuresHandler,
  currentGuestsHandler,
  availableProductsHandler,
} from "./FrontPageDataFetcher";
import Main from "../Main/Main";

const HostelData = ({ loginState }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRequests, setActiveRequests] = useState(null);
  const [arrivals, setArrivals] = useState(null);
  const [departures, setDepartures] = useState(null);
  const [currentGuests, setCurrentGuests] = useState(null);
  const [availableProducts, setAvailableProducts] = useState(null);

  useEffect(() => {
    setIsLoggedIn(loginState);

    if (loginState === true) {
      const dispatcher = async () => {
        const data = [
          setActiveRequests,
          setArrivals,
          setDepartures,
          setCurrentGuests,
          setAvailableProducts,
        ];
        try {
          const activeRequestsData = activeRequestsHandler();
          const arrivalsData = arrivalsHandler();
          const departuresData = departuresHandler();
          const currentGuestsData = currentGuestsHandler();
          const availableProductsData = availableProductsHandler();

          Promise.allSettled([
            activeRequestsData,
            arrivalsData,
            departuresData,
            currentGuestsData,
            availableProductsData,
          ]).then((values) => {
            for (let i = 0; i < values.length; i++) {
              if (values[i].value.status === 200) {
                data[i](values[i].value.data);
              }
            }
            console.log(values);
          });
        } catch (error) {
          console.error(error.message);
        }
      };

      dispatcher();
    }
  }, [loginState]);

  console.log(activeRequests);
  console.log(arrivals);
  console.log(departures);
  console.log(currentGuests);
  console.log(availableProducts);
  return (
    <>
      <Main>
        {isLoggedIn ? (
          <>
            <h1 className="text-4xl">Hostel Data</h1>
            <section className="flex flex-col gap-5 mt-10">
              <div className="text-xl">
                <span>Active requests: </span>
                <span>
                  {activeRequests === null
                    ? "Data unavailable"
                    : activeRequests}
                </span>
              </div>
              <div className="text-xl">
                <span>{"Today's arrivals:"} </span>
                <span>{arrivals === null ? "Data unavailable" : arrivals}</span>
              </div>
              <div className="text-xl">
                <span>{"Today's departures:"} </span>
                <span>
                  {departures === null ? "Data unavailable" : departures}
                </span>
              </div>
              <div className="text-xl">
                <span>Currently living: </span>
                <span>
                  {currentGuests === null ? "Data unavailable" : currentGuests}
                </span>
              </div>
              <div className="text-xl">
                <span>Available products: </span>
                <span>
                  {availableProducts === null ||
                  Object.keys(availableProducts).length === 0
                    ? "Data unavailable"
                    : availableProducts}
                </span>
              </div>
            </section>
          </>
        ) : (
          <>
            <h1 className="text-4xl">Hostel Data</h1>
          </>
        )}
      </Main>
    </>
  );
};

export default HostelData;
