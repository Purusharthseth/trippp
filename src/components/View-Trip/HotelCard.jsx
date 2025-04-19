import { GetPlacesDetails, PHOTO_REF_URL } from "@/index";
import React, { useEffect, useState } from "react";


function HotelCard({ hotel }) {
    const [photoURL, setPhotoURL] = useState("");

   
    useEffect(() => {
      if (!hotel?.hotelName) return;
    
      const GetPlacePhoto = async () => {
        try {
          const data = {
            textQuery: hotel.hotelName,
          };

    
          const resp = await GetPlacesDetails(data);
          const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;
    
          if (photoName) {
            setPhotoURL(PHOTO_REF_URL.replace("{NAME}", photoName));
          } else {
            console.warn("No photo found for", hotel.hotelName);
          }
        } catch (error) {
          console.error("Error fetching place photo:", error);
          setPhotoURL("");
        }
      };
    
      GetPlacePhoto();
    }, [hotel?.hotelName]);
  return (
    <div className="rounded-lg mt-3 p-3 bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={photoURL || "/Placeholder.png"}
          className="rounded-lg mt-3 cursor-pointer h-[180px] w-full object-cover"
        />
      </a>
      <div className="my-2">
        <h2 className="font-medium text-gray-700">{hotel?.hotelName}</h2>
        <h2 className="text-xs text-gray-500">📌 {hotel?.address}</h2>
        <h2 className="text-sm font-medium">{hotel?.priceEstimate}</h2>
        <h2 className="text-sm font-medium">⭐ {hotel?.rating} out of 5</h2>
      </div>
    </div>
  );
}

export default HotelCard;
