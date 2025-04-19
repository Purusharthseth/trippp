export const SelectTravelsOptions = [
    {id: 1,
        title: "Solo",
        desc: "For all solo travellers",
        icon: "🧍",
        people:"1"
    },
    {
        id: 2,
        title: "Couple",
        desc: "For all hand holding intimacy travellers",
        icon: "👫",
        people:"2"
    },
    {id: 3,
        title: "Smol Group",
        desc: "For all smol but adventurous group travellers",
        icon: "👪",
        people:"3-5"
    },
    {id: 4,
        title: "Group",
        desc: "For all big groups",
        icon: "👥",
        people:"6-10"
    }
]

export const SelectBudgetOptions = [
    {   id: 1,
        title: "Low",
        desc: "Not spending much people",
        icon: "💵",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Costs must be average",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Do not worry about cost",
        icon: "💸"
    }
]

export const AI_PROMPT = `
Generate a complete travel plan in **valid JSON format only**. Do not include any text outside the JSON. Structure the JSON as follows:

{
  "travelPlan": {
    "location": "{{destination}}",
    "duration": {{days}},
    "groupSize": "{{peopleCount}} people",
    "budget": "{{budget}}",
    "hotelOptions": [
      {
        "hotelName": "",
        "address": "",
        "priceEstimate": "", //has to be in rupees
        "imageUrl": "",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "rating": 0.0,
        "description": ""
      },
      ...
    ],
    "itinerary": [
      {
        "day": 1,
        "places": [
          {
            "placeName": "",
            "details": "",
            "imageUrl": "",
            "geoCoordinates": {
              "latitude": 0.0,
              "longitude": 0.0
            },
            "ticketPricing": "",
            "rating": 0.0,
            "bestTimeToVisit": "",
            "travelTimeEstimate": ""
          },
          ...
        ]
      },
      ...
    ]
  }
}

Make sure the JSON is complete and properly closed. Limit each day to 2-3 major places. Avoid repeating or overly long descriptions. Do NOT include markdown or explanations outside the JSON block.
`