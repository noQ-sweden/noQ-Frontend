import React from 'react'
import { useState, useEffect } from "react";


export default function TempDataFetcher() {

    const [data, setData] = useState("");


    
    useEffect(() => {
        fetch("https://noqbackend.pythonanywhere.com/api/users", {
          method: "GET",

        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            console.log(data);
          })
          .catch((error) => console.log(error));
      }, []);

    return (
        <div>TempDataFetcher

        This is the data: {data}

        </div>
        
    )
}
