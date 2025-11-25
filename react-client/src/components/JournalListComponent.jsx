import React, { useState, useEffect } from 'react';
import JournalsService from '../JournalsService';
import '../index.css';
import { Link } from 'react-router-dom';

const JournalsListComponent = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {

    JournalsService.getJournals().then((res) => {
      setJournals(res.data);
      document.title = 'Journals List';
    });

  }, []);

  return (
    <div>
      <div className="row">
        <h2 className="text-center">Journals List</h2>
        <Link to="/add-journal" className="btn btn-outline-primary">Add Journal Entry</Link>
      </div>
      <main className="items-container">
        {journals.map(journal => (
          <article className="item" key={journal.id}>
            <div>
              <img src={journal.imgUrl} alt="Journal Image" className="item-image" />
            </div>
            
            <div className="text">
              <h3>
                {journal.title}
              </h3>
              <h4>
                {journal.place_name}
              </h4>
              <h4>
                {new Date(journal.start_date).toISOString().split("T")[0]} to {new Date(journal.end_date).toISOString().split("T")[0]}
              </h4>

              <p>{journal.text_entry}</p>

              <div className="row">
                <p><Link className="btn btn-outline-info" to={`/journals/${journal.id}`}>View</Link></p>
                <button className="btn btn-danger" onClick={() => JournalsService.deleteJournal(journal.id)
                .then(() => setJournals(journals.filter(j => j.id !== journal.id)))}>Delete</button>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default JournalsListComponent;