import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import JournalListComponent from './components/JournalListComponent.jsx';
import AddJournalComponent from './components/AddJournalComponent.jsx';
import './App.css'

function App() {

  return (
    <>
      <Nav />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<JournalListComponent />} />
            <Route path="/add-journal" element={<AddJournalComponent />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
