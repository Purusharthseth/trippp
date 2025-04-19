import { GetPlacesDetails, MagicCard, PHOTO_REF_URL } from "@/index";
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

function PlaceCard({ place }) {

  
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (!place?.placeName) return;

    const GetPlacePhoto = async () => {
      try {
        const data = {
          textQuery: place?.placeName,
        };

        const resp = await GetPlacesDetails(data);
        const photoName = resp?.data?.places?.[0]?.photos?.[4]?.name;

        if (photoName) {
          setPhotoURL(PHOTO_REF_URL.replace("{NAME}", photoName));
        } else {
          console.warn("No photo found for", place.placeName);
        }
      } catch (error) {
        console.error("Error fetching place photo:", error);
        setPhotoURL("");
      }
    };

    GetPlacePhoto();
  }, [place?.placeName]);
  return (
    <MagicCard className="w-[170px] md:w-[190px] lg:w-[210px] relative group rounded-lg shadow-md bg-white overflow-hidden">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Main Content */}
        <div className="flex flex-col items-center text-center p-3 transition-opacity duration-100 group-hover:opacity-0 z-10 relative">
          <img
            src={photoURL || "/Placeholder.png"}
            className="w-[130px] h-[130px] rounded-lg mb-2 object-cover"
            alt="Place"
          />
          <h2 className="font-semibold text-gray-700 text-xl">
            {place?.placeName}
          </h2> 
          <h2 className="text-sm text-gray-500">In {place?.bestTimeToVisit}</h2>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20">
          <p className="mb-1 font-semibold">⭐ {place.rating}/5</p>
          <p className="mb-1 text-xs">{place?.details}</p>
          <p className="text-green-700 text-xs mt-2 font-medium">
            {place?.ticketPricing}
          </p>
          <MdLocationOn className="mt-4 text-2xl" />
        </div>
      </a>
    </MagicCard>
  );
}

export default PlaceCard;
