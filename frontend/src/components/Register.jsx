import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("")
  
const handleClick = async () => {
    try {
    const res = await axios.post("http://localhost:3000/api/register", { name, email, password }, { withCredentials: true });
    
    if (res) {
        alert(res.data.message);
        navigate("/")
        } 
    } catch (error) {
        alert(error.response.data.error);
      }
  }
  return (
    <>
      <div>
        name : <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        email : <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        password : <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleClick}>Register</button>
      </div>
    </>
  );
}

export default Register
