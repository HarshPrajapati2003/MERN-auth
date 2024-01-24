import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("")
  
const handleClick = async () => {
    try {
    const res = await axios.post("http://localhost:3000/api/login", { email, password }, { withCredentials: true });
    
    if (res) {
        alert("Login successfully!");
        navigate("/")
        } 
    } catch (error) {
        alert(error.response.data.error);
      }
  }

  return (
    <>
      <div>
        email : <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        password : <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleClick}>Login</button>
      </div>
    </>
  );
}

export default Login
