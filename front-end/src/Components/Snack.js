import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react'
const API = process.env.REACT_APP_API_URL;

function Snack({ snack }) {
  return (
    <tr>
      <td>
        {snack.image}
      </td>
      <td>
        <a>
          {snack.name}
        </a>
      </td>
      <td>
        <Link to={`/snacks/${snack.id}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Snack;