import express from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './res.js'; // Import plagiarism checking logic

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the built frontend files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/copycat/dist')));

// API Routes
app.use('/api', apiRoutes);

// Fallback route for React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/copycat/dist', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
