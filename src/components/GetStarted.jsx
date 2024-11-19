import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";
import HerePlacesAutocomplete from "./HerePlacesAutocomplete";
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";

const db = getFirestore(app);

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
      return;
    }

    if (days > 29) {
      alert("Maximum days to travel is 29");
      return;
    }

    const tripDetails = {
      budget: budget || "Not specified",
      companion: companion || "Not specified",
      days: days || "Not specified",
      source,
      destination,
      peopleCount: companion === "Family" || companion === "Friends" ? peopleCount : "Not applicable",
    };

    console.log("Generated Trip Details: ", tripDetails);

    return tripDetails;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripDetails = generateTrip();
    if (!tripDetails) return;

    // Save trip details to Firebase
    try {
      await addDoc(collection(db, "tripDetails"), tripDetails);
      alert("Trip details saved to Firebase successfully!");

      navigate({
        pathname: "/tripdetails",
        state: { tripDetails: tripDetails },
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Firebase Error:", err);
    }
  };

  return (
    <div className="get-started-container">
      <h2>Plan Your Trip</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label>Budget:</label>
          <div className="options-container">
            {["Low", "Medium", "High"].map((level) => (
              <div
                key={level}
                className={`option-box ${budget === level ? "selected" : ""}`}
                onClick={() => setBudget(level)}
              >
                {level}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Who are you traveling with?</label>
          <div className="options-container">
            {["Solo", "Family", "Friends", "Couple"].map((group) => (
              <div
                key={group}
                className={`option-box ${companion === group ? "selected" : ""}`}
                onClick={() => setCompanion(group)}
              >
                {group}
              </div>
            ))}
          </div>
        </div>

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

        <div className="form-group">
          <label>Source Location:</label>
          <HerePlacesAutocomplete
            value={source}
            onChange={handleSourceChange}
          />
        </div>

        <div className="form-group">
          <label>Destination Location:</label>
          <HerePlacesAutocomplete
            value={destination}
            onChange={handleDestinationChange}
          />
        </div>

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

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
