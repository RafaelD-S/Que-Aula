import express from "express";
import cors from "cors";

import Data from "./classes.json" with { type: "json" };

const app = express();
const port = 3000;

app.use(cors());

app.get("/api/data", (req, res) => {
  const data = Data.flatMap((item) => item.classes);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
