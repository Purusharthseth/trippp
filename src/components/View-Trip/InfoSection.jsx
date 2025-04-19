import { GetPlacesDetails, PHOTO_REF_URL, } from '@/index';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'sonner';



function InfoSection({ trip }) {

  const [photoURL, setPhotoURL] = useState("");



  function copyCurrentURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => toast("URL copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  }

  useEffect(() => {
      if (!trip?.destination) return;
  
      const GetPlacePhoto = async () => {
        try {
          const data = {
            textQuery: trip?.destination,
          };

  
          const resp = await GetPlacesDetails(data);
          const photoName = resp?.data?.places?.[0]?.photos?.[4]?.name;
  
          if (photoName) {
            setPhotoURL(PHOTO_REF_URL.replace("{NAME}", photoName));
          } else {
            console.warn("No photo found for", trip?.destination);
          }
        } catch (error) {
          console.error("Error fetching place photo:", error);
          setPhotoURL("");
        }
      };
  
      GetPlacePhoto();
    }, [trip?.destination]);
  return (
    <div>
      {/* Header Image */}
      <img
        src={photoURL || "/Placeholder.png"}
        className="h-[360px] w-full object-cover rounded-xl"
        alt="Trip Visual"
      />

      {/* Destination Title */}
      <div className="flex flex-col gap-2 my-5">
        <h2 className="font-bold text-2xl">{trip?.destination}</h2>
      </div>

      {/* Info Cards + Share Button */}
      <div className="flex items-start gap-4 mt-4">
        {/* Info Cards Container */}
        <div className="flex flex-1 flex-wrap gap-4">
          {/* Days */}
          <div className="flex-1 p-4 bg-gray-100 rounded-2xl shadow-md text-center">
            <h2 className="text-gray-600 text-lg font-semibold">
              {trip?.days === 1 ? "1 day" : `${trip?.days} days`}
            </h2>
          </div>

          {/* People Count */}
          <div className="flex-1 p-4 bg-gray-100 rounded-2xl shadow-md text-center">
            <h2 className="text-gray-600 text-lg font-semibold">
              {trip?.peopleCount === "1" ? "1 person" : `${trip?.peopleCount} people`}
            </h2>
          </div>

          {/* Budget */}
          <div className="flex-1 p-4 bg-gray-100 rounded-2xl shadow-md text-center">
            <h2 className="text-gray-600 text-lg font-semibold">
              {trip?.budget} Budget
            </h2>
          </div>
        </div>

        {/* Share Button */}
        <button
          className="h-fit p-3 bg-blue-400 hover:bg-blue-800 text-white rounded-full shadow-md"
          onClick={() => copyCurrentURL()}
          title="Share"
        >
          <IoIosSend className='cursor-pointer' size={24} />
        </button>
      </div>

      
    </div>
  );
}

export default InfoSection;
