import Protected from './Protected'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/logout", null, { withCredentials: true });
      if (res.status == 200) {
      alert("Logout successfully!")
      navigate("/login");
    }
    } catch (error) {
       alert("Somthing went wrong!");
    }
  }
  return (
    <Protected>
      <div>
        <h1>This is the Home (Only authenticated user can access this page)</h1>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </Protected>
  );
}

export default Home