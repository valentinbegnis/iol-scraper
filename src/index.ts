import express from "express";
import portfolioRouter from "./routes/portfolio.router";
import { PORT } from "./constants";

const app = express();

app.get("/", async (_, res) => {
  res.send("test");
});

app.use("/portfolio", portfolioRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
