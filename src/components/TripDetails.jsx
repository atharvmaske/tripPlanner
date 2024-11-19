import React, { useState, useEffect } from 'react';

const TripDetails = ({ tripDetails }) => {
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example function to simulate fetching trip data (since we're no longer using the API)
  const fetchTripData = () => {
    setLoading(true);
    try {
      // Simulating itinerary data fetching (this would be from your backend or other source)
      const dummyItinerary = [
        { title: 'Day 1: Arrival', description: 'Arrive at destination and check-in.' },
        { title: 'Day 2: City Tour', description: 'Explore local landmarks and attractions.' },
        // Add more days as needed
      ];
      
      setItineraryData(dummyItinerary); // Set dummy data for the itinerary
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load trip details. Please try again.");
      setLoading(false);
    }
  };

  // Trigger API request when tripDetails changes
  useEffect(() => {
    if (tripDetails?.destination) {
      fetchTripData(); // Now just calling the local function for dummy data
    }
  }, [tripDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Trip Details</h2>
      <section>
        <h3>Itinerary</h3>
        {itineraryData ? (
          itineraryData.map((item, index) => (
            <div key={index} className="itinerary-item">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No itinerary data available.</p>
        )}
      </section>

      {/* You can add more sections here for additional trip details */}
    </div>
  );
};

export default TripDetails;
