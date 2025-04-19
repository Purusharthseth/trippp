import axios from "axios"

export const PHOTO_REF_URL= "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const Base_url= "https://places.googleapis.com/v1/places:searchText"

const config={
    headers:{
         'Content-Type':"application/json",
         "X-Goog-API-key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
         'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
    }
}


export const GetPlacesDetails = (data) => {
    if (!data?.textQuery || data.textQuery.trim().length === 0) {
      console.warn("Invalid or empty textQuery passed to GetPlacesDetails:", data);
      return Promise.reject(new Error("Invalid textQuery"));
    }
    return axios.post(Base_url, data, config);
  };