import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

export default function TotalNightStay({
  stays = [],
  startDate,
  endDate,
}) {
  const filteredStays = stays.filter(stay =>
    stay.user_stay_counts && stay.user_stay_counts.some(userStay => userStay.total_nights > 0)
  );

  const totalNights = filteredStays.reduce(
    (sum, stay) =>
      sum +
      stay.user_stay_counts.reduce(
        (staySum, userStay) => staySum + (userStay.total_nights || 0),
        0
      ),
    0
  );

  const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

  return (
    <div>
      <div className="flex justify-start font-sans text-sm font-semibold">
        <div className="flex flex-col items-center justify-normal font-bold">
          {filteredStays.length === 0 ? (
            <div className="text-xl font-medium">
              Ange period gäst och klicka på Sök
            </div>
          ) : (
            <div className="text-xl font-medium">
              Totalt {totalNights} nätter mellan {formattedStartDate} och{" "}
              {formattedEndDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

TotalNightStay.propTypes = {
  stays: PropTypes.arrayOf(
    PropTypes.shape({
      user_stay_counts: PropTypes.arrayOf(
        PropTypes.shape({
          total_nights: PropTypes.number,
        })
      ),
    })
  ),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

