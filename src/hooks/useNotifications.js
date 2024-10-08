import { useNotifications } from './../../context/NotificationProvider';

const Navbar = ({ first_name, last_name }) => {
    const { notifications } = useNotifications();
    const nrOfAlerts = notifications.length; // or however you track unread notifications
    // ... rest of the component
};
