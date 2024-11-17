import express from 'express';
import fs from 'fs';
import { exec } from 'child_process'; // Import exec for running the command
const router = express.Router();

// This route receives the repository URLs and saves them to a file
router.post('/ditector', (req, res) => {
  const { repos } = req.body;

  // Log the received data (for debugging)
  console.log('Received repository URLs:', repos);

  // Format the data as a string
  const logData = `${repos[0]}\n${repos[1]}\n---\n`;

  // Save the data to a text file (append mode)
  try {
    fs.writeFileSync('repo_urls.txt', logData);  // This will save the URLs to the file
    console.log('Repository URLs saved to repo_urls.txt');
  } catch (err) {
    console.error('Error saving URLs to file:', err);
    return res.status(500).json({ error: 'Failed to save URLs' });
  }

  // Run node ../res1.js after saving the URLs
  exec('cd ../ && npm run start1', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running res1.js: ${stderr}`);
      return res.status(500).json({ error: 'Failed to run res1.js' });
    }
    console.log('res1.js executed successfully:', stdout);
  });

  // Simulate plagiarism check result for now
  const plagiarismResults = { message: 'Plagiarism check results here' };

  // Send a response back to the frontend
  res.json(plagiarismResults);
});

export default router;
