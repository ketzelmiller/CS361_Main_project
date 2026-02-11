import { useNavigate } from "react-router-dom";

function Welcome(){
  const navigate = useNavigate();

  return(
    <div>
      <h1>Habit Tracker</h1>
      <h2>A place to track what matters to you, your way.</h2>
      {/*<button onClick={() => navigate("/habits")}>Get Started</button>*/}
      <footer>Kyle Etzelmiller &copy; 2025</footer>
    </div>
  )
}


export default Welcome;