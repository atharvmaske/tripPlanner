import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HerePlacesAutocomplete from "./HerePlacesAutocomplete";
import { generateTripDetails } from "../services/AImodel";  // Import the correct function
import "./GetStarted.css";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCQBPHCdEXQsLdKtxKxbhD17NSDEwjrVcY";

const GetStarted = () => {
  const [budget, setBudget] = useState("");
  const [companion, setCompanion] = useState("");
  const [days, setDays] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const navigate = useNavigate();

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const generateTrip = () => {
    if (!source || !destination) {
      alert("Please select both source and destination.");
      return null;
    }
  
    if (days > 29) {
      alert("Maximum days to travel is 29");
      return null;
    }
  
    // Payload formatted for Gemini API
    return {
      contents: [
        {
          parts: [
            {
              text: `Plan a trip from ${source} to ${destination} for ${days} days. Budget: ${budget || "Not specified"}. Companion: ${companion || "Not specified"}. ${
                peopleCount ? `People: ${peopleCount}.` : ""
              }`,
            },
          ],
        },
      ],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripDetails = generateTrip();
    if (!tripDetails) return;

    console.log("Request payload:", tripDetails); // Debug: Log the payload to verify

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripDetails),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`API responded with status ${response.status}: ${errorDetails}`);
      }

      const apiData = await response.json();
      console.log("API Response:", apiData);
      navigate("/tripdetails", { state: { tripData: apiData } });
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("API Error:", err);
    }
  };

  return (
    <div className="get-started-container">
      <h2>Plan Your Trip</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        {/* Budget Selection */}
        <div className="form-group">
          <label>Budget:</label>
          <div className="options-container">
            {["Low", "Medium", "High"].map((level) => (
              <button
                key={level}
                type="button"
                className={`option-box ${budget === level ? "selected" : ""}`}
                onClick={() => setBudget(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Companion Selection */}
        <div className="form-group">
          <label>Who are you traveling with?</label>
          <div className="options-container">
            {["Solo", "Family", "Friends", "Couple"].map((group) => (
              <button
                key={group}
                type="button"
                className={`option-box ${companion === group ? "selected" : ""}`}
                onClick={() => setCompanion(group)}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Days */}
        <div className="form-group">
          <label>Days of Travel:</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="form-control"
            placeholder="Enter number of days"
            required
          />
        </div>

        {/* Source Location */}
        <div className="form-group">
          <label>Source Location:</label>
          <HerePlacesAutocomplete value={source} onChange={handleSourceChange} />
        </div>

        {/* Destination Location */}
        <div className="form-group">
          <label>Destination Location:</label>
          <HerePlacesAutocomplete value={destination} onChange={handleDestinationChange} />
        </div>

        {/* Number of People (Conditional) */}
        {(companion === "Family" || companion === "Friends") && (
          <div className="form-group">
            <label>Number of People:</label>
            <input
              type="number"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className="form-control"
              placeholder="Enter number of people"
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
