import express from 'express';




const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Notification service is running');
});

app.get("/_status/healthz", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get("/_status/readyz", (req, res) => {
    res.status(200).json({ status: "ready" });
});





export default app;