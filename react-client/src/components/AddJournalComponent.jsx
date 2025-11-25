import { useState, useEffect } from "react";
import JournalsService from "../JournalsService";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddJournalComponent = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [textEntry, setTextEntry] = useState("");

  // Manual place info
  const [placeId, setPlaceId] = useState("");

  // Image upload
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Journal";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedUrl = imageUrl;

    // Upload image if selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      uploadedUrl = res.data.fileUrl;
    }

    const newJournal = {
      title,
      placeId,
      startDate,
      endDate,
      textEntry,
      imageUrl: uploadedUrl,
    };

    await JournalsService.createJournal(newJournal);

    // Reset form
    setTitle("");
    setStartDate("");
    setEndDate("");
    setTextEntry("");
    setPlaceId("");
    setFile(null);
    setImageUrl("");

    navigate("/");
  };

  return (
    <div>
      <h2 className="text-center">Add Journal</h2>
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
          <label>Place ID:</label>
          <input
            type="text"
            className="form-control"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            placeholder="Enter Place ID manually"
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

        {/* Image Upload */}
        <div className="form-group mt-2">
          <label>Upload Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: 200 }} />
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Save Journal
        </button>
      </form>
    </div>
  );
};

export default AddJournalComponent;
