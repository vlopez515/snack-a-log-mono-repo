import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function SnackEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [snack, setSnack] = useState({
   name: "", 
   fiber: 0, 
   protein: 0, 
   added_sugar: 0, 
   is_healthy: false, 
   image: "",
  });

  const updateSnack = (updatedSnack) => {
    axios
      .put(`${API}/snacks/${id}`, updatedSnack)
      .then(
        () => {
          navigate(`/snacks/${id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setSnack({ ...snack, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSnack({ ...snack, is_healthy: !snack.is_healthy });
  };

  useEffect(() => {
    axios.get(`${API}/snacks/${id}`).then(
      (response) => setSnack(response.data),
      (error) => navigate(`/not-found`)
    );
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSnack(snack, id);
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
      <Link to={`/snacks/${id}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default SnackEditForm;
