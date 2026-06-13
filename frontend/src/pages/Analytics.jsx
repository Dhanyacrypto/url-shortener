import "./Analytics.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(`/analytics/${id}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="analytics-container">
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div className="analytics-container">

      <div className="analytics-header">

        <div>
          <h1 className="analytics-title">
             URL Analytics
          </h1>

          <p>
            Track performance and monitor visits
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>

      </div>

      <div className="stats-grid">

        <div className="glass-card">
          <h3>Total Clicks</h3>

          <div className="stat-value">
            {data.totalClicks}
          </div>
        </div>

        <div className="glass-card">
          <h3>Last Visited</h3>

          <p>
            {data.lastVisited
              ? new Date(
                  data.lastVisited
                ).toLocaleString()
              : "Never"}
          </p>
        </div>

      </div>


      <div className="glass-card">

        <h3>Recent Visits</h3>

        <br />

        {data.recentVisits.length === 0 ? (
          <p>No visits recorded.</p>
        ) : (
          data.recentVisits.map(
            (visit, index) => (
              <div
                className="visit-item"
                key={visit._id}
              >
                <strong>
                  Visit #{index + 1}
                </strong>

                <br />

                {new Date(
                  visit.timestamp
                ).toLocaleString()}
              </div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default Analytics;