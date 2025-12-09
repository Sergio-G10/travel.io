import React, { useState, useEffect } from 'react';
import JournalsService from '../JournalsService';
import '../index.css';
import { Link } from 'react-router-dom';
import JournalComponent from './JournalComponent';

const JournalsListComponent = () => {
  const [journals, setJournals] = useState([]);

  // Gets all journals
  useEffect(() => {
    console.log("Fetching journals from JournalListComponent")
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

  // Iterates through journals and renders components for each
  return (
    <div>
      <div className="row heading-row">
        <h2 className="text-center">Journals List</h2>
        <Link to="/add-journal" className="btn">Add Journal Entry</Link>
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