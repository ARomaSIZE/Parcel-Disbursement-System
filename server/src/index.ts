import { dbConfig } from "./config/config";
import mysql from "mysql";
import express from "express";

const app = express();
app.use(express.json());
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  } else {
    console.log("Connected to the database");
  }
});

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM user", (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
