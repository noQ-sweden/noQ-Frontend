import React from 'react';
import ReactDOM from 'react-dom';
import Host from './Host';
import UserDetails from './UserDetails';
import Product from './Product';
import User from './User';
import Region from './Region';
import Booking from './Booking';
import Available from './Available';

const App = () => {
    // Mock data for Host component
    const hostData = {
        user: 'JohnDoe',
        name: 'John Doe',
        street: '123 Main Street',
        postcode: '12345',
        city: 'Example City',
        region: 'Example Region'
    };

    // Mock data for UserDetails component
    const userDetailsData = {
        user: 'JaneDoe',
        firstName: 'Jane',
        lastName: 'Doe',
        gender: 'F',
        street: '456 Elm Street',
        postcode: '54321',
        city: 'Test City',
        country: 'Test Country',
        phone: '123-456-7890',
        email: 'jane@example.com',
        unokod: 'UN123',
        dayOfBirth: '1990-01-01',
        personnrLastnr: '1234',
        region: 'Test Region',
        lastEdit: '2024-04-01'
    };

    // Mock data for Product component
    const productData = {
        name: 'Example Product',
        description: 'This is an example product',
        totalPlaces: 10,
        host: hostData, // Passing hostData as prop
        type: 'Example Type'
    };

    // Mock data for User component
    const userData = {
        userName: 'testuser',
        password: 'testpassword',
        groups: ['Group1', 'Group2'] // Assuming groups is an array of strings
    };

    // Mock data for Region component
    const regionData = {
        name: 'Test Region'
    };

    // Mock data for Booking component
    const bookingData = {
        startDate: '2024-04-02',
        product: productData, // Passing productData as prop
        user: userDetailsData // Passing userDetailsData as prop
    };

    // Mock data for Available component
    const availableData = {
        availableDate: '2024-04-03',
        product: productData, // Passing productData as prop
        placesLeft: 5
    };

    return (
        <div>
            {/* Render Host component with hostData */}
            <Host {...hostData} />
            {/* Render UserDetails component with userDetailsData */}
            <UserDetails {...userDetailsData} />
            {/* Render Product component with productData */}
            <Product {...productData} />
            {/* Render User component with userData */}
            <User {...userData} />
            {/* Render Region component with regionData */}
            <Region {...regionData} />
            {/* Render Booking component with bookingData */}
            <Booking {...bookingData} />
            {/* Render Available component with availableData */}
            <Available {...availableData} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
