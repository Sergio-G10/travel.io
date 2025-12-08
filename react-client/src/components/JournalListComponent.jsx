import React, { useState, useEffect } from 'react';
import JournalsService from '../JournalsService';
import '../index.css';
import { Link } from 'react-router-dom';
import JournalComponent from './JournalComponent';

const JournalsListComponent = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {

    JournalsService.getJournals().then((res) => {
      setJournals(res.data);
      document.title = 'Journals List';
    });

  }, []);

  const handleDelete = (id) => {
    JournalsService.deleteJournal(id).then(() => {
      setJournals(prev => prev.filter(j => j.id !== id));
    });
  };

  return (
    <div>
      <div className="row">
        <h2 className="text-center">Journals List</h2>
        <Link to="/add-journal" className="btn btn-outline-primary">Add Journal Entry</Link>
      </div>
      <main className="items-container">
        {journals.map(journal => (
          <JournalComponent 
            key={journal.id} 
            journalID={journal.id}
            onDelete={handleDelete}
          />))}
      </main>
    </div>
  );
};

export default JournalsListComponent;