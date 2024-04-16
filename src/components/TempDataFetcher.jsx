import React, { useState, useEffect } from 'react';

export default function TempDataFetcher() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/test/users", {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, []);

    const printData = () => {
        return data.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
                {Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div>
            
        </div>
    );
};
