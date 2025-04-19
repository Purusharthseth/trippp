import { PlaceCard } from '@/index';
import React from 'react';

function Places({ trip }) {
  const tripData = typeof trip.tripData === "string" ? JSON.parse(trip.tripData) : trip.tripData;

  return (
    <div className='mt-5'>
      <h2 className="font-bold text-xl mb-4">Places to visit</h2>
      <div className="space-y-6">
        {tripData?.travelPlan?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-semibold text-gray-700 text-xl mb-2">On day {item?.day}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {item.places.map((place, placeIndex) => (
                <PlaceCard place={place} key={placeIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;
