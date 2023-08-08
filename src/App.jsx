import React, { useEffect, useState } from "react";
import "./App.css"; // Import the custom CSS styles from App.css

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  function fetchUserData() {
    let apiUrl = `https://api.github.com/users/${username}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (username.trim() !== "") {
      fetchUserData();
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="input-field"
          />
          <button
            type="submit"
            className="submit-button"
          >
            Get User Data
          </button>
        </form>
        {userData ? (
          <div className="user-data">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="user-avatar"
            />
            <h1 className="user-info">{userData.login}</h1>
            <p className="user-info">Repositories: {userData.public_repos}</p>
            <p className="user-info">Followers: {userData.followers}</p>
            <p className="user-info">Following: {userData.following}</p>
          </div>
        ) : (
          username.trim() !== "" && (
            <h1 className="validusername">
              Enter a valid username
            </h1>
          )
        )}
      </div>
    </div>
  );
}

export default App;
