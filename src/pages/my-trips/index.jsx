import { databases } from "@/index";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal("userEmail", user?.email)] 
      );

      setUserTrips(result?.documents);
      console.log(userTrips);
      
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };


  return (
    <div className="p-6 md:px-24 lg:px-36 xl:px-52 bg-gray-50">
      <h2 className="font-bold text-3xl text-gray-800 mb-8">My Adventures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTrips?.length>0? userTrips.map((trip, index) => (
          <Link to={'/view-trip/' + trip?.$id} key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-xl hover:scale-102"
          >
            <div className="p-6">
              <h3 className="font-semibold text-xl text-indigo-700 mb-2">{trip?.destination}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Budget:</span> {trip?.budget}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Duration:</span> {trip?.days} Days
              </p>
              <p className="text-gray-600">
                <span className="font-medium">People:</span> {trip?.peopleCount}
              </p>
            </div>
          </Link>
        )):[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} 
          className="h-[250px] w-full bg-gray-200 animate-pulse">
            
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default MyTrips;
