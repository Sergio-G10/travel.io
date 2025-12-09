import { useState, useEffect } from "react";
import JournalsService from "../JournalsService";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const EditJournalComponent = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [textEntry, setTextEntry] = useState("");

  // Manual place info
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const { id } = useParams();

  useEffect(() => {
    async function fetchJournal() {
      try {
        const { data } = await JournalsService.getJournalById(id);
        setTitle(data.title);
        setLatitude(data.place_lat);
        setLongitude(data.place_lng);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setTextEntry(data.text_entry);
      } catch (err) {
        console.error("Error fetching journal:", err);
      }
    }
    fetchJournal();
  }, [id]);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Journal";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedJournal = {
      title,
      latitude,
      longitude,
      startDate,
      endDate,
      textEntry,
    };

    await JournalsService.editJournal(id, editedJournal);

    // Reset form
    setTitle("");
    setStartDate("");
    setEndDate("");
    setTextEntry("");
    setLatitude("");
    setLongitude("");

    navigate("/");
  };

  return (
    <div>
      <h2 className="text-center">Update Journal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Trip Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Manual Place Fields */}
        <div className="form-group mt-2">
          <label>Latitude:</label>
          <input
            type="text"
            className="form-control"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter Latitude"
          />
        </div>

        <div className="form-group mt-2">
          <label>Longitude:</label>
          <input
            type="text"
            className="form-control"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter Longitude"
          />
        </div>

        {/* Dates */}
        <div className="form-group mt-2">
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* Journal Entry */}
        <div className="form-group mt-2">
          <label>Journal Entry:</label>
          <textarea
            className="form-control"
            rows="5"
            value={textEntry}
            onChange={(e) => setTextEntry(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Update Journal
        </button>
      </form>
    </div>
  );
};

export default EditJournalComponent;
