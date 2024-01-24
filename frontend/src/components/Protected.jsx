import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
  const navigate = useNavigate();

  const handleAuth =
    async () => {
      console.log("protected")
      try {
        await axios.get("http://localhost:3000/", {
          withCredentials: true,
        });
        navigate("/");
        // If the request is successful, the user is authenticated
      } catch (error) {
        // If there's an error, navigate to the login page
        navigate("/login");
      }
    };
  useEffect(() => {
    handleAuth(); // Call the function only once when the component mounts
  }, []);

  return <div>{children}</div>;
};

export default Protected
