import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to clone repositories and run the command
function cloneAndRunCommand() {
  const filePath = 'backend/repo_urls.txt'; // The file that contains repo URLs
  const testDirectory = path.join(__dirname, 'test_directory'); // Directory for test repo
  const refDirectory = path.join(__dirname, 'ref_directory'); // Directory for reference repo

  // Read the repo URLs from the file
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    const repoUrls = data.split('\n').filter(Boolean); // Filter out any empty lines

    if (repoUrls.length < 2) {
      console.error('Not enough repository URLs in the file');
      return;
    }

    const testRepoUrl = repoUrls[0]; // The first repo URL
    const refRepoUrl = repoUrls[1]; // The second repo URL

    // Clone the test repository
    exec(`git clone ${testRepoUrl} ${testDirectory}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error cloning test repository: ${stderr}`);
        return;
      }
      console.log('Test repository cloned successfully.');

      // Clone the reference repository
      exec(`git clone ${refRepoUrl} ${refDirectory}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error cloning reference repository: ${stderr}`);
          return;
        }
        console.log('Reference repository cloned successfully.');

        // Write or overwrite the configuration file with new content
        const configuration = {
          test_directories: [testDirectory], 
          reference_directories: [refDirectory], 
          extensions: [
            "html", "css", "scss", "sass", "js", "jsx", "ts", "tsx", "json", "md", 
            "vue", "graphql", "py", "java", "rb", "go", "php", "sh", "bash", "pl", 
            "c", "cpp", "swift", "sql", "db", "yaml", "yml", "xml", "ini", "env", 
            "toml", "lock", "ipynb"
          ]
        };

        try {
          fs.writeFileSync('configuration.json', JSON.stringify(configuration, null, 2));
          console.log('configuration.json has been rewritten.');
        } catch (err) {
          console.error('Error writing configuration.json:', err);
          return;
        }

        // Run the plagiarism check after writing configuration.json
        exec('copydetect -c configuration.json', (err, stdout, stderr) => {
          if (err) {
            console.error(`Error executing copydetect: ${stderr}`);
            return;
          }
          console.log('Copydetect command executed successfully:', stdout);
        });
      });
    });
  });
}

// Call the function to execute the process
cloneAndRunCommand();
