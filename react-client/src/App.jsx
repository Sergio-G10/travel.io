import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import JournalListComponent from './components/JournalListComponent.jsx';
import AddJournalComponent from './components/AddJournalComponent.jsx';
import JournalDetailComponent from './components/JournalDetailComponent.jsx';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Nav />

        <div className="container">
          <Routes>
            <Route path="/" element={<JournalListComponent />} />
            <Route path="/add-journal" element={<AddJournalComponent />} />
            <Route path="/journals/:id" element={<JournalDetailComponent />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
