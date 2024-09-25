import { React } from 'react';
import PropTypes from "prop-types";
import RequestList from './RequestList';
import useHeader from "./../../hooks/useHeader";
import { GetBookingConfig } from './GetBookingConfig';

export default function RequestPageView({userGroup}) {
    const { setHeader } = useHeader();
    setHeader("Bokningar");

    RequestPageView.propTypes = {
        userGroup: PropTypes.string.isRequired
    };

    const bookingConfig = GetBookingConfig(userGroup);

    return (
        <div className='p-4'>
            <div>
                <RequestList config={bookingConfig}/>
            </div>
        </div>
    );
}
