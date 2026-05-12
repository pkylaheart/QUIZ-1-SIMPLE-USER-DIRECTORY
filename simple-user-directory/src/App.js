import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data = await res.json();

      setUsers(data.slice(0, 5));
    } catch (error) {
      setErrorMessage("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="content">

      <div className="container">

        <div className="title-wrapper">

          <h1 className="title">
            USER DIRECTORY 
          </h1>

          <button
            className="refresh-btn"
            onClick={fetchUsers}
          >
            Refresh
          </button>

        </div>

        {loading ? (

          <p className="loading-text">
            Loading users...
          </p>

        ) : errorMessage ? (

          <p className="error-message">
            {errorMessage}
          </p>

        ) : (

          <div className="users-card-wrapper">

            {users.map((user) => (
              <div
                key={user.id}
                className="user-card"
              >

                <ul>
                  <li>Name: {user.name}</li>
                  <li>Email: {user.email}</li>
                  <li>Company Name: {user.company.name}</li>
                </ul>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}