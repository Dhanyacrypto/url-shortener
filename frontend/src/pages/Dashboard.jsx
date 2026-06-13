import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLink,
  FaMousePointer,
  FaCopy,
  FaChartLine,
  FaTrash,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
const [customAlias, setCustomAlias] = useState("");
  const [showQR, setShowQR] = useState(false);
const [qrValue, setQrValue] = useState("");
const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await api.get("/url/myurls");
      setUrls(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUrl = async () => {
    try {
      await api.post("/url/create", {
        originalUrl,
        customAlias,
      });

      setOriginalUrl("");
      fetchUrls();

      alert("Short URL Created");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create URL"
      );
    }
  };

  const deleteUrl = async (id) => {
    try {
      await api.delete(`/url/${id}`);
      fetchUrls();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const copyUrl = (shortCode) => {
    navigator.clipboard.writeText(
      `https://urlforge-backend.onrender.com/${shortCode}`
    );

    setCopied(true);
  };
  
  const generateQR = (shortCode) => {
  setQrValue(
    `https://urlforge-backend.onrender.com/${shortCode}`
  );
  
  setShowQR(true);
};

const downloadQR = () => {

  const canvas =
    document.getElementById(
      "qr-code"
    );

  const pngUrl =
    canvas
      .toDataURL("image/png")
      .replace(
        "image/png",
        "image/octet-stream"
      );

  const downloadLink =
    document.createElement("a");

  downloadLink.href = pngUrl;

  downloadLink.download =
    "urlforge-qr.png";

  document.body.appendChild(
    downloadLink
  );

  downloadLink.click();

  document.body.removeChild(
    downloadLink
  );
};

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const totalClicks = urls.reduce(
    (sum, url) => sum + url.clickCount,
    0
  );

  const topUrl =
  urls.length > 0
    ? urls.reduce((max, url) =>
        url.clickCount > max.clickCount
          ? url
          : max
      )
    : null;

  const chartData = urls
  .slice(0, 5)
  .map((url) => ({
    name:
      url.shortCode.length > 12
        ? url.shortCode.slice(0, 12)
        : url.shortCode,

    clicks: url.clickCount,
  }));
  
  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            🔗 URL Shortener Pro
          </h1>

          <p>
            Manage, track and analyze your links
    from one beautiful workspace.
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <FaLink size={30} />
          <h4>Total URLs</h4>
          <div className="stat-number">
            {urls.length}
          </div>
        </div>

        <div className="stat-card">
          <FaMousePointer size={30} />
          <h4>Total Clicks</h4>
          <div className="stat-number">
            {totalClicks}
          </div>
        </div>

        <div className="stat-card">

  <h4>🏆 Top Performer</h4>

  <div className="stat-number">
    {topUrl
      ? topUrl.clickCount
      : 0}
  </div>

  <p>
    {topUrl
      ? topUrl.shortCode
      : "No URLs"}
  </p>

</div>


      </div>

      <div className="create-card">

        <h3>Create New URL</h3>

        <input
          type="text"
          className="url-input"
          placeholder="Paste your long URL..."
          value={originalUrl}
          onChange={(e) =>
            setOriginalUrl(e.target.value)
          }
        />

<input
  type="text"
  className="url-input"
  placeholder="Custom Alias (Optional)"
  value={customAlias}
  onChange={(e) =>
    setCustomAlias(e.target.value)
  }
/>

        <button
          className="create-btn"
          onClick={createUrl}
        >
          <FaPlus /> Create URL
        </button>

      </div>

      <div className="create-card">

  <h3>🔍 Search URLs</h3>

  <input
    type="text"
    className="url-input"
    placeholder="Search by URL or Alias..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

</div>


      <div className="chart-card">

  <h3>
    📊 Top Performing URLs
  </h3>

  <div
    style={{
      width: "100%",
      height: 300
    }}
  >

    <ResponsiveContainer>

      <BarChart data={chartData}>

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="clicks"
          radius={[8, 8, 0, 0]}
          fill="#8B5CF6"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

      <div className="url-grid">

       {urls
  .filter((url) =>
    url.originalUrl
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    url.shortCode
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((url) => (

          <div
            className="url-card"
            key={url._id}
          >

            <div className="url-original">
              {url.originalUrl}
            </div>

            <a
  className="url-short"
  href={`https://urlforge-backend.onrender.com/${url.shortCode}`}
  target="_blank"
  rel="noreferrer"
>
  🔗 {url.shortCode}
</a>

            <p>
              Clicks:
              <strong>
                {" "}
                {url.clickCount}
              </strong>
            </p>

            <div className="action-buttons">

              <button
                className="custom-btn copy-btn"
                onClick={() =>
                  copyUrl(url.shortCode)
                }
              >
                <FaCopy /> Copy
              </button>

              <button
                className="custom-btn analytics-btn"
                onClick={() =>
                  navigate(
                    `/analytics/${url._id}`
                  )
                }
              >
                <FaChartLine />
                Analytics
              </button>
              
              <button
  className="custom-btn copy-btn"
  onClick={() =>
    generateQR(url.shortCode)
  }
>
  📱 QR
</button>

              <button
                className="custom-btn delete-btn"
                onClick={() =>
                  deleteUrl(url._id)
                }
              >
                <FaTrash /> Delete
              </button>

            </div>

          </div>

        ))}

      </div>
{
  showQR && (
    <div className="qr-overlay">

      <div className="qr-modal">

        <h3>Scan QR Code</h3>

        <QRCodeCanvas
  id="qr-code"
  value={qrValue}
  size={220}
/>

<button
  className="download-btn"
  onClick={downloadQR}
>
  ⬇ Download QR
</button>

        <button
          className="close-btn"
          onClick={() =>
            setShowQR(false)
          }
        >
          Close
        </button>

      </div>

    </div>
  )
}
    </div>
  );
}

export default Dashboard;