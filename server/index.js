const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello from the API server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
