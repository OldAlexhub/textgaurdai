import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS for styling

function SMS() {
  // State to hold the form data entered by the user (suspicious text)
  const [formData, setFormData] = useState({
    text: "", // The 'text' field in the form
  });

  // State to hold the result returned by the AI (Spam or Good)
  const [resultData, setResultData] = useState(null);

  // This function handles input changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // This function handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page refresh)

    try {
      // Sending the form data to the backend API (spam checker) using Axios
      const response = await axios.post(
        `${process.env.REACT_APP_SPAM}`, // Backend URL stored in environment variables
        formData
      );
      // If the request is successful, store the result from the API in state
      if (response.status === 200) {
        setResultData(response.data.results); // Setting the result data (Spam or Good)
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
      {/* Main container for the form and result section */}
      <div
        className="container p-5 rounded shadow-lg bg-gradient"
        style={{ backgroundColor: "#1d1f21", maxWidth: "600px" }}
      >
        {/* Introductory Verbiage for the Project */}
        <div className="mb-5">
          <h2
            className="text-center"
            style={{ color: "#00d4ff", fontWeight: "bold" }}
          >
            Welcome to TextGuard AI
          </h2>
          <p style={{ color: "#c4c4c4", textAlign: "center" }}>
            <strong>TextGuard AI</strong> is your AI-powered solution for
            identifying suspicious or harmful text messages. Whether you're
            concerned about spam, phishing attempts, or other threats, simply
            input the text, and our machine learning model will analyze it to
            determine if it's GOOD or SPAM.
          </p>
          <p style={{ color: "#c4c4c4", textAlign: "center" }}>
            Enter a message below to check if it's spam or a legitimate message!
          </p>
        </div>

        {/* Form where users input suspicious text */}
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-3">
            {/* Input field for entering the text to analyze */}
            <input
              name="text"
              type="text"
              className="form-control form-control-lg rounded-pill"
              value={formData.text} // Controlled input (value linked to state)
              onChange={handleChange} // Calls handleChange function when input changes
              placeholder="Enter suspicious text"
              style={{
                backgroundColor: "#2a2d31",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          {/* Button to submit the form and trigger text analysis */}
          <button
            type="submit"
            className="btn btn-lg btn-info rounded-pill text-dark"
            style={{
              background: "linear-gradient(45deg, #00c6ff, #0072ff)",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Analyze
          </button>
        </form>

        {/* Display the result from the AI analysis */}
        <div className="mt-4">
          {resultData ? (
            // If resultData is available, show it inside an alert box
            <div className="alert alert-info text-center" role="alert">
              <strong>{resultData}</strong>
            </div>
          ) : (
            // If no resultData yet, display "No Data" as a placeholder
            <div className="text-center mt-3">
              <h4 style={{ color: "#9b9b9b" }}>No Data</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SMS;
