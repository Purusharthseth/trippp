import { HotelCard } from "@/index";
import React, { useEffect } from "react";

function Hotels({ trip }) {
  const tripData = typeof trip.tripData === "string" ? JSON.parse(trip.tripData) : trip.tripData;
    useEffect(() => {
      if (tripData) {
        console.log(tripData);
      }
    }, [tripData]);


  return (
    <div>
      <h2 className="font-bold text-xl mt-10">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {tripData?.travelPlan?.hotelOptions.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
