import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function SnackNewForm() {
 let navigate = useNavigate();
 const API = process.env.REACT_APP_API_URL;

 const addSnack = (newSnack) => {
    axios
      .post(`${API}/snacks`, newSnack)
      .then(
        () => {
          navigate(`/snacks`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const [snack, setSnack] = useState({
   name: "", 
   fiber: 0, 
   protein: 0, 
   added_sugar: 0, 
   is_healthy: false, 
   image: "",
  });

  const handleTextChange = (event) => {
    setSnack({ ...snack, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSnack({ ...snack, is_healthy: !snack.is_healthy });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addSnack(snack);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label For="name">Name:</label>
        <input
          id="name"
          value={snack.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Snack"
          required
        />
        <label For="fiber">Fiber:</label>
        <input
          id="fiber"
          type="text"
          value={snack.fiber}
          placeholder="0g"
          onChange={handleTextChange}
        />
        <label For="protein">Category:</label>
        <input
          id="protein"
          type="text"
          value={snack.protein}
          placeholder="0g"
          onChange={handleTextChange}
        />
        <label For="is_healthy">Nutritionist Approved:</label>
        <input
          id="is_healthy"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={snack.is_healthy}
        />
        <label For="image">Image:</label>
        <input
          id="image"
          type="text"
          pattern="http[s]*://.+"
          required
          value={snack.image}
          placeholder="https://"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SnackNewForm;