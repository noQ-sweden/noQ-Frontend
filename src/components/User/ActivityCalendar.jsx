import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from "date-fns";
import { sv } from "date-fns/locale/sv";
import PropTypes from 'prop-types';
import moment from 'moment';


const locales = {
    sv: sv,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales
});

function ActivityCalendar({ activities, selectedDate, setSelectedDate }) {
    const event = activities.map((activity) => ({
        id: activity.id,
        title: activity.title,
        start: new Date(activity.start_time),
        end: new Date(activity.end_time),
    }));

    const handleSelectSlot = ({ start }) => {
        const formattedDate = moment(start).format('DD-MM-YYYY');
        setSelectedDate(formattedDate);
    };

    const customMessages = {
        next: 'Nästa',
        previous: 'Föregående',
        today: 'Idag',
        month: 'Månad',
        week: 'Vecka',
        day: 'Dag',
        agenda: 'Dagordning',
        activitiesTitle: 'Mina aktiviteter',
        more: 'Mer',
        showMore: (total) => `Mer (${total})`,
    };


    return (
        <div>
            <Calendar
                localizer={localizer}
                culture="sv" // Swedish locale
                selectable
                events={event}
                defaultView="month"
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectSlot}
                value={selectedDate}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={customMessages}
            />
        </div>
    );
}


ActivityCalendar.propTypes = {
    activities: PropTypes.array.isRequired,
    selectedDate: PropTypes.string.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};

export default ActivityCalendar;
