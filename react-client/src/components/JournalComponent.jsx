import React, { useState, useEffect } from 'react';
import JournalsService from '../JournalsService';
import '../index.css';
import { Link } from 'react-router-dom';

const JournalComponent = ( { journalID, onDelete }) => {
  const [journal, setJournal] = useState(null);

  // Gets journal based on ID prop
  useEffect(() => {

    JournalsService.getJournalById(journalID).then((res) => {
      setJournal(res.data);
    });

  }, [journalID]);

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

        <div className="row button-row">
          <Link className="btn btn-outline-info" to={`/journals/${journal.id}`}>
            View
          </Link>

          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(journal.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
)};

export default JournalComponent;