import './App.css';
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PastHabits from './pages/PastHabitsPage';

// Importing Components
import Welcome from './pages/WelcomePage';
import MyHabits from './pages/ViewPage';
import CreatePage from './pages/CreatePage';
import NavBar from './components/NavBar';
import EditPage from './pages/EditPage';


function App() {
  const [habitToEdit, setHabitToEdit] = useState(null)

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element = {<Welcome/>}></Route>
        <Route path="/habits" element = {<MyHabits setHabitToEdit={setHabitToEdit}/>}></Route>
        <Route path="/create" element = {<CreatePage/>}></Route>
        <Route path="/edit/:id" element={<EditPage habitToEdit={habitToEdit}/>}></Route>
        <Route path="/past-habits" element={<PastHabits/>}></Route>
      </Routes>
    </BrowserRouter>
  );

} 

//adding a comment to test git

export default App;