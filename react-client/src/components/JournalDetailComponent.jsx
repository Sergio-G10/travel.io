import React, { useState, useEffect, useRef } from 'react';
import JournalsService from '../JournalsService';
import '../index.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const JournalDetailComponent = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const mapRef = useRef(null);

  // Gets journal based on ID param
  useEffect(() => {
    JournalsService.getJournalById(id).then((res) => {
      setJournal(res.data);
    });
  }, [id]);

  // Builds Google Map (code adapted from Google Maps JS API docs)
  const loadGoogleMapsScript = (callback) => {
    if (window.google) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_KEY
    }`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!journal) return;

    loadGoogleMapsScript(() => {
      const position = {
        lat: parseFloat(journal.place_lat),
        lng: parseFloat(journal.place_lng),
      };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: position,
      });

      new window.google.maps.Marker({
        position,
        map,
        title: journal.place_name,
      });
    });
  }, [journal]);



  if (!journal) { return null; }

  return (
    <article className="item" key={journal.id}>
      <img src={journal.imgUrl} alt="Journal" className="item-image" />

      <div className="text">
        <h3>{journal.title}</h3>
        <h4>{journal.place_name}</h4>
        <h4>
          {new Date(journal.start_date).toISOString().split("T")[0]} to {new Date(journal.end_date).toISOString().split("T")[0]}
        </h4>
        <p>{journal.text_entry}</p>

        <div className="map-container"
        ref={mapRef}>
        </div>
        <button>
          <Link className="btn edit-button" to={`/edit-journal/${journal.id}`}>
            Edit Journal
          </Link>
        </button>
      </div>
    </article>
)};

export default JournalDetailComponent;