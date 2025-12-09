import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import JournalListComponent from './components/JournalListComponent.jsx';
import AddJournalComponent from './components/AddJournalComponent.jsx';
import JournalDetailComponent from './components/JournalDetailComponent.jsx';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';
import LoginPage from './components/auth/LoginComponent';
import ProfilePage from './components/auth/ProfilePage.jsx';
import EditJournalComponent from './components/EditJournalComponent.jsx';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Nav />

        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/" element={<JournalListComponent />} />
              <Route path="/add-journal" element={<AddJournalComponent />} />
              <Route path="/edit-journal/:id" element={<EditJournalComponent />} />
              <Route path="/journals/:id" element={<JournalDetailComponent />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
