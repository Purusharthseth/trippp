import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { databases, InfoSection, Hotels, Places } from "@/index";
import { toast } from "sonner";
 

function Viewtrip() {
  const navigate= useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
  const getTripData = async (tripId) => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        tripId
      );
      setTrip(response);
      
        // const parsedTripData =
        //   typeof response.tripData === "string"
        //     ? JSON.parse(response.tripData)
        //     : response.tripData;
        // console.log(parsedTripData);

      //   return response;
    } catch (error) {
      console.error("No such document or error fetching trip:", error.message);
      toast.error("No trip Found!");
      navigate('/my-trips');
    }
  };

  useEffect(() => {
    tripId && getTripData(tripId);
  }, [tripId]);

  return (
    <div className="p-5 md:px-20 lg:px-30 xl:px-44">
      <InfoSection trip={trip}/>
      <Hotels trip={trip}/>
      <Places trip={trip}/>
    </div>
  )
}

export default Viewtrip;
