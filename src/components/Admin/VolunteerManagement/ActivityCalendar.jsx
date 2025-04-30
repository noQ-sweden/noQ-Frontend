import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { sv } from "date-fns/locale/sv";
import PropTypes from "prop-types";

const locales = {
  sv: sv,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const ActivityCalendar = ({ activities }) => {
  const event = activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
    start: new Date(activity.start_time),
    end: new Date(activity.end_time),
  }));

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">📆 Aktivitetskalender</h3>
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

ActivityCalendar.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ActivityCalendar;
