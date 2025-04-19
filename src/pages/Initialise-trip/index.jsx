import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  Input,
  SelectBudgetOptions,
  SelectTravelsOptions,
  InteractiveHoverButton,
  AI_PROMPT,
  chatSession,
  useDialog,
  useUser} from "@/index";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc} from "firebase/firestore";
import { databases } from "@/services/AppwriteConfig"; 
import { useNavigate } from "react-router-dom";


function InitializeTrip() {
  const [destination, setDestination] = useState("");
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const {openDialog}= useDialog();

  const navigate= useNavigate();

  const {user}=useUser();
 
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  
  
  const generateTrip = async () => { 

    if(!formData?.destination|| !formData?.budget || !formData?.peopleCount || !formData?.days){ 
      toast("Please fill all the details.");
      return;
    }



    if(!user){
      openDialog();
      return;
    }

    setLoading(true);
    const finalPrompt= AI_PROMPT
    .replace("{{destination}}", formData?.destination.label)
    .replace("{{budget}}", formData?.budget)
    .replace("{{peopleCount}}", formData?.peopleCount)
    .replace("{{days}}", formData?.days)
    .replace("{{days}}", formData?.days)

    

    const result = await chatSession.sendMessage(finalPrompt);

    const rawText =  result?.response?.text();
    const cleaned = rawText
      .replace(/^['"`]{3}(json)?\n?/, "")   // removes ```json\n or '''json\n
      .replace(/['"`]{3}$/, "");            // removes ``` or ''' at the end
    
    
    saveTrip(cleaned);
    setLoading(false); 
  }; 

  // const saveTrip = async (tripData )=>{
  //   const user=JSON.parse(localStorage.getItem('user'))
  //   const docId = Date.now().toString();

  //   await setDoc(doc(db, "AITrips", docId ), {
  //     userSelection: {
  //       ...formData,
  //       destination: formData?.destination?.label || "",
  //     },
  //     tripData: tripData,
  //     userEmail: user?.email,
  //     id: docId
  //   });
  // }

  const saveTrip = async (tripData) => {
    const docId = Date.now().toString(); // or use a custom ID like `Date.now().toString()`
  
    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // your Database ID
        import.meta.env.VITE_APPWRITE_COLLECTION_ID, // your Collection ID
        docId,
        {
          destination: formData?.destination?.label || "",
          budget: formData?.budget,
          peopleCount: formData?.peopleCount,
          days: formData?.days,
          tripData: tripData,
          userEmail: user?.email,
        }
      );

      navigate("/view-trip/"+docId);
    } catch (error) {
      console.error("Failed to save trip to Appwrite:", error);
    }
  };

  
  return (
    <div className="sm:px-15 md:px-25 lg:px-35 xl:px-50 px-5 mt-10 max-w-300 mx-auto">
      <h2 className="font-bold text-3xl">
        And what your travel preferences be?
      </h2>
      <p className="text-gray-500 text-xl mt-2">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-10 flex flex-col gap-5">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Destination of choice will be?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              destination,
              onChange: (v) => {
                setDestination(v);
                handleInputChange("destination", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            For how many days will it be?
          </h2>
          <Input
            type="number"
            placeholder="Number of Days"
            max={"6"}
            onChange={(e) => {
              if (e.target.value > 6) e.target.value = 6;
              handleInputChange("days", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            And how much money would you like to spend on the whole endeavor?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-xl cursor-pointer transition ${
                  selectedBudget === item.title
                    ? "bg-green-300 border-green-500 shadow-md"
                    : "shadow-sm"
                }`}
                onClick={() => {
                  setSelectedBudget(item.title);
                  handleInputChange("budget", item.title);
                }}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-1xl font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            And how many people will you be at the trip?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsOptions.map((item, index) => (
              <div key={index} className="relative group">
                <div
                  className={`p-4 border h-full rounded-lg hover:shadow-xl cursor-pointer transition w-full ${
                    selectedPeople === item.people
                      ? "bg-blue-300/50 border-blue-500 shadow-md"
                      : "shadow-sm"
                  }`}
                  onClick={() => {
                    setSelectedPeople(item.people);
                    handleInputChange("peopleCount", item.people);
                  }}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="text-1xl font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>

                {/* Hover Bar */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {item.people} {item.id === 1 ? "person" : "people"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10 mb-20">
      {loading ? (
        <div className="flex justify-center items-center p-2">
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        </div>
      ) : (
        <InteractiveHoverButton onClick={generateTrip}>
          Generate Trip
        </InteractiveHoverButton>
      )}
      </div>
    </div>
  );
}

export default InitializeTrip;
