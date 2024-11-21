import React from 'react';
import { useLocation } from 'react-router-dom';

const TripDetails = () => {
  const location = useLocation();
  const { tripData } = location.state || {}; // Get the passed data

  // Check if data exists and has valid contents
  if (!tripData || !tripData.tripPlans) {
    return <div>No itinerary data available.</div>;
  }

  const renderTripCard = (plan, planIndex) => (
    <div key={planIndex} className="trip-card">
      <h3>{plan.planName}</h3>

      {/* Hotels List */}
      <h4>Hotel Options:</h4>
      <ul className="hotel-list">
        {plan.hotels.map((hotel, hotelIndex) => (
          <li key={hotelIndex} className="hotel-item">
            <h5>{hotel.hotelName}</h5>
            <p>Address: {hotel.hotelAddress}</p>
            <p>Price: {hotel.price}</p>
            <img src={hotel.hotelImageUrl} alt={hotel.hotelName} />
            <p>Rating: {hotel.rating}</p>
            <p>{hotel.description}</p>
          </li>
        ))}
      </ul>

      {/* Itinerary */}
      <h4>Itinerary:</h4>
      <ul className="itinerary-list">
        {Object.keys(plan.itinerary).map((day, dayIndex) => (
          <li key={dayIndex} className="itinerary-day">
            <h5>{day}</h5>
            <ul className="activity-list">
              {plan.itinerary[day].map((activity, activityIndex) => (
                <li key={activityIndex} className="activity-item">
                  <h6>{activity.placeName}</h6>
                  <p>{activity.placeDetails}</p>
                  <img src={activity.placeImageUrl} alt={activity.placeName} />
                  <p>Ticket Pricing: {activity.ticketPricing}</p>
                  <p>Rating: {activity.rating}</p>
                  <p>Best Time to Visit: {activity.timeToVisit}</p>
                  <p>Geo Coordinates: {activity.geoCoordinates}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="trip-details-container">
      <h2>Trip Details</h2>
      <div className="trip-cards">
        {tripData.tripPlans.map(renderTripCard)}
      </div>
    </div>
  );
};

export default TripDetails;