import { useNavigate } from "react-router-dom";

function Welcome(){
  const navigate = useNavigate();

  return(
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => navigate("/habits")}>Get Started</button>
  
    </div>
  )
}


export default Welcome;