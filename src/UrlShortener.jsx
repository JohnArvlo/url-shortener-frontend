// UrlShortener.jsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode"; 
import LightModeIcon from "@mui/icons-material/LightMode"; 
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function UrlShortener() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(false); 

  const { mode, setMode } = useColorScheme();
  if (!mode) return null;

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const validateUrl = (url) => {
    // regex simple para validar URLs
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocolo
      "(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z]{2,}" + // dominio
      "(\\/[\\w\\-\\.~]*)*" + // ruta
      "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // query
      "(\\#[a-zA-Z0-9\\-]*)?$", // hash
      "i"
    );
    return !!pattern.test(url);
  };

  const createShortUrl = async () => {
    if (!validateUrl(inputUrl)) {
      setError(true); // activa el popup
      return;
    }

    const response = await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: inputUrl }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {/* Botón para alternar tema */}
      <Tooltip>
        <IconButton
          onClick={toggleMode}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            ":focus": { outline: "none" },
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>

      <div
        className="main-container"
        style={{
          backgroundColor:
            mode === "light" ? "#f1f1f1d2" : "rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img src="/url-logo.png" alt="URL Shortener Logo" />
        <h1>URL Shortener</h1>

        <p>Enter a URL to shorten it:</p>

        <div className="form-container">
          <input
          type="text"
          placeholder="https://your-url.com"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          style={{
              width: "300px",
              padding: "0.5rem 0.8rem",
              border: error ? "2px solid #e53935" : "2px solid #4a4faa", // rojo si error
              borderRadius: "100px",
              color: error ? "#e53935" : "#747bff",
              outline: "none",
              backgroundColor: "transparent",
              ":focus": {
              boxShadow: "0 0 0 2px rgba(83, 91, 242, 0.3)",
              },
          }}
          />  

          <button onClick={createShortUrl} style={{ marginLeft: "1rem" }}>
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div style={{ marginTop: "2rem" }}>
            <p>Your short URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>

      {/* Snackbar (popup) */}
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setError(false)}
          severity="error"
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          Please enter a valid URL
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default UrlShortener;
