const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `I cannot directly access and display images or real-time pricing for hotels. Hotel prices and availability are dynamic and change constantly. Also, I cannot provide geo-coordinates directly. You'll need to use a mapping service like Google Maps to obtain those after I provide you with addresses.\\n\\nHowever, I can give you a JSON structure containing the information you requested, and you can fill in the missing image URLs, prices, and coordinates using online search engines and mapping tools. Here's a JSON representation of several possible budget-friendly Las Vegas trip plans for a couple over 3 days: \\n\\n\\\`\`\`json\\n{\\n  "tripPlans": [\\n    {\\n      "planName": "Budget-Friendly Vegas: Exploring the Strip & Downtown",\\n      "hotels": [\\n        {\\n          "hotelName": "Circus Circus Hotel & Casino",\\n          "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\\n          "price": "Variable - Check Booking Sites",\\n          "hotelImageUrl": "URL_TO_IMAGE",\\n          "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n          "rating": "3.5 stars (Example)",\\n          "description": "Affordable hotel with a circus theme, good location on the Strip."\\n        },\\n        {\\n          "hotelName": "The D Las Vegas",\\n          "hotelAddress": "300 Fremont Street, Las Vegas, NV 89101",\\n          "price": "Variable - Check Booking Sites",\\n          "hotelImageUrl": "URL_TO_IMAGE",\\n          "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n          "rating": "4 stars (Example)",\\n          "description": "Downtown hotel with a retro vibe, good for exploring Fremont Street."\\n        }\\n      ],\\n      "itinerary": {\\n        "day1": [\\n          {\\n            "placeName": "Fremont Street Experience",\\n            "placeDetails": "Free light show, street performers, casinos.",\\n            "placeImageUrl": "URL_TO_IMAGE",\\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n            "ticketPricing": "Free",\\n            "rating": "4 stars (Example)",\\n            "timeToVisit": "Evening"\\n          },\\n          {\\n            "placeName": "SlotZilla Zipline",\\n            "placeDetails": "Zipline experience above Fremont Street.",\\n            "placeImageUrl": "URL_TO_IMAGE",\\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n            "ticketPricing": "Variable - Check website",\\n            "rating": "4.5 stars (Example)",\\n            "timeToVisit": "Afternoon"\\n          }\\n        ],\\n        "day2": [\\n          {\\n            "placeName": "Bellagio Fountains",\\n            "placeDetails": "Free water show.",\\n            "placeImageUrl": "URL_TO_IMAGE",\\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n            "ticketPricing": "Free",\\n            "rating": "4.8 stars (Example)",\\n            "timeToVisit": "Evening"\\n          },\\n          {\\n            "placeName": "The Strip (walking)",\\n            "placeDetails": "Explore casinos, shops, and sights along the Las Vegas Strip.",\\n            "placeImageUrl": "URL_TO_IMAGE",\\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n            "ticketPricing": "Free",\\n            "rating": "5 stars (Example)",\\n            "timeToVisit": "Afternoon"\\n          }\\n        ],\\n        "day3": [\\n          {\\n            "placeName": "Seven Magic Mountains",\\n            "placeDetails": "Colorful art installation (short drive from the Strip).",\\n            "placeImageUrl": "URL_TO_IMAGE",\\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\\n            "ticketPricing": "Free",\\n            "rating": "4.5 stars (Example)",\\n            "timeToVisit": "Afternoon"\\n          }\\n        ]\\n      }\\n    },\\n    {\\n      "planName": "Budget Vegas: Focus on Free Activities",\\n      // Add additional plans here\\n    }\\n  ]\\n}\\n\\\`\`\`\\n\\nRemember to replace the placeholder values with actual data. You can find images on sites like Google Images, and prices/ratings on booking sites like Expedia, Kayak, Booking.com, etc. Use Google Maps to find the geo-coordinates. Create a similar structure for additional budget travel plans as needed.\\n\\n\``
       },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `I cannot directly access and display images or real-time pricing for hotels. Hotel prices and availability are dynamic and change constantly. Also, I cannot provide geo-coordinates directly. You'll need to use a mapping service like Google Maps to obtain those after I provide you with addresses.\n\nHowever, I can give you a JSON structure containing the information you requested, and you can fill in the missing image URLs, prices, and coordinates using online search engines and mapping tools. Here's a JSON representation of several possible budget-friendly Las Vegas trip plans for a couple over 3 days:\n\n\n```json\n{\n  "tripPlans": [\n    {\n      "planName": "Budget-Friendly Vegas: Exploring the Strip & Downtown",\n      "hotels": [\n        {\n          "hotelName": "Circus Circus Hotel & Casino",\n          "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n          "price": "Variable - Check Booking Sites",\n          "hotelImageUrl": "URL_TO_IMAGE",\n          "geoCoordinates": "[LATITUDE, LONGITUDE]",\n          "rating": "3.5 stars (Example)",\n          "description": "Affordable hotel with a circus theme, good location on the Strip."\n        },\n        {\n          "hotelName": "The D Las Vegas",\n          "hotelAddress": "300 Fremont Street, Las Vegas, NV 89101",\n          "price": "Variable - Check Booking Sites",\n          "hotelImageUrl": "URL_TO_IMAGE",\n          "geoCoordinates": "[LATITUDE, LONGITUDE]",\n          "rating": "4 stars (Example)",\n          "description": "Downtown hotel with a retro vibe, good for exploring Fremont Street."\n        }\n      ],\n      "itinerary": {\n        "day1": [\n          {\n            "placeName": "Fremont Street Experience",\n            "placeDetails": "Free light show, street performers, casinos.",\n            "placeImageUrl": "URL_TO_IMAGE",\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\n            "ticketPricing": "Free",\n            "rating": "4 stars (Example)",\n            "timeToVisit": "Evening"\n          },\n          {\n            "placeName": "SlotZilla Zipline",\n            "placeDetails": "Zipline experience above Fremont Street.",\n            "placeImageUrl": "URL_TO_IMAGE",\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\n            "ticketPricing": "Variable - Check website",\n            "rating": "4.5 stars (Example)",\n            "timeToVisit": "Afternoon"\n          }\n        ],\n        "day2": [\n          {\n            "placeName": "Bellagio Fountains",\n            "placeDetails": "Free water show.",\n            "placeImageUrl": "URL_TO_IMAGE",\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\n            "ticketPricing": "Free",\n            "rating": "4.8 stars (Example)",\n            "timeToVisit": "Evening"\n          },\n          {\n            "placeName": "The Strip (walking)",\n            "placeDetails": "Explore casinos, shops, and sights along the Las Vegas Strip.",\n            "placeImageUrl": "URL_TO_IMAGE",\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\n            "ticketPricing": "Free",\n            "rating": "5 stars (Example)",\n            "timeToVisit": "Afternoon"\n          }\n        ],\n        "day3": [\n          {\n            "placeName": "Seven Magic Mountains",\n            "placeDetails": "Colorful art installation (short drive from the Strip).",\n            "placeImageUrl": "URL_TO_IMAGE",\n            "geoCoordinates": "[LATITUDE, LONGITUDE]",\n            "ticketPricing": "Free",\n            "rating": "4.5 stars (Example)",\n            "timeToVisit": "Afternoon"\n          }\n        ]\n      }\n    },\n    {\n      "planName": "Budget Vegas: Focus on Free Activities",\n      // Add additional plans here\n    }\n  ]\n}\n```\n\n\nRemember to replace the placeholder values with actual data. You can find images on sites like Google Images, and prices/ratings on booking sites like Expedia, Kayak, Booking.com, etc. Use Google Maps to find the geo-coordinates. Create a similar structure for additional budget travel plans as needed.\n\n`,
          },
        ],
      },
    ],
  });

  // Run the chat session and get the response
  const result = await chatSession.sendMessage("Please generate the travel plan details.");
  console.log(result.response.text());
}

run();
