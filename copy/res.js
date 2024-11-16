import { exec } from 'child_process';
import axios from 'axios';
import fs from 'fs';

// Clear cache by running `npm run clearCache`
exec('npm run clearCache', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error clearing cache: ${stderr}`);
    return;
  }
  console.log('Cache cleared successfully.');

  // Generate a random page number between 1 and 10
  const pageNumber = Math.floor(Math.random() * 10) + 1;

  // Define the GitHub API URL with dynamic page number and sorting
  const apiUrl = `https://api.github.com/search/repositories?q=mern+chat+app+language:javascript&per_page=5&page=${pageNumber}&sort=stars`;

  // Define the output file name
  const outputFile = 'clone_urls.txt';

  // Fetch clone URLs and save to file
  axios
    .get(apiUrl)
    .then((response) => {
      const cloneUrls = response.data.items.map((item) => item.clone_url);
      fs.writeFileSync(outputFile, cloneUrls.join('\n'), 'utf-8');
      console.log(`Clone URLs saved to ${outputFile}`);

      // Execute the Node.js script `f.js`
      exec('node f.js', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error executing f.js: ${stderr}`);
          return;
        }
        console.log('Node.js script executed successfully:', stdout);
      });
    })
    .catch((error) => {
      console.error('Error fetching data from GitHub API:', error.message);
    });
});
