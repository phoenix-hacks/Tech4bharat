const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let index = 1;

// Paths
const cloneUrlsPath = path.join(__dirname, 'clone_urls.txt');
const testDirectoryPath = path.join(__dirname, 'test_directory');
const refDirectoryPath = path.join(__dirname, 'ref_directory');

// Read the clone_urls.txt file
async function rf() {
    fs.readFile(cloneUrlsPath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading clone_urls.txt:', err);
            return;
        }

        const urls = data.split('\n').map(url => url.trim()).filter(url => url); // Clean URLs
        for (const url of urls) {
            console.log(`Cloning repo: ${url}`);
            await cloneRepoAndRunCheck(url);
        }
    });
}

// Clone repository and run plagiarism check
async function cloneRepoAndRunCheck(url) {
    await cleanCache(); // Ensure the cache is cleaned before cloning

    return new Promise((resolve, reject) => {
        const repoName = url.split('/').pop().replace('.git', '');
        const clonePath = path.join(refDirectoryPath, repoName);

        exec(`git clone ${url} ${clonePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Git clone error: ${error}`);
                reject(error);
                return;
            }
            console.log(`Git clone output: ${stdout}`);
            console.error(`Git clone stderr: ${stderr}`);

            // Run plagiarism detection
            runPlagiarismCheck(repoName).then(resolve).catch(reject);
        });
    });
}

// Clean the cache directory
async function cleanCache() {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(refDirectoryPath)) {
                console.log('Cleaning cache...');
                fs.rmSync(refDirectoryPath, { recursive: true, force: true });
            }
            fs.mkdirSync(refDirectoryPath, { recursive: true });
            console.log('Cache cleared and recreated.');
            resolve();
        } catch (error) {
            console.error('Error cleaning cache:', error);
            reject(error);
        }
    });
}

// Run plagiarism check
async function runPlagiarismCheck(repoName) {
    return new Promise((resolve, reject) => {
        const configuration = {
            test_directories: [testDirectoryPath],
            reference_directories: [path.join(refDirectoryPath, repoName)],
            extensions: ['jsx', 'js'],
        };

        fs.writeFileSync('configuration.json', JSON.stringify(configuration, null, 2));

        exec('copydetect -c configuration.json', (error, stdout, stderr) => {
            if (error) {
                console.error(`Copydetect error: ${error}`);
                reject(error);
                return;
            }

            console.log(`Plagiarism check stdout: ${stdout}`);
            console.error(`Plagiarism check stderr: ${stderr}`);

            // Rename the report
            const reportPath = `report${index}.html`;
            exec(`mv report.html ${reportPath}`, (mvError, mvStdout, mvStderr) => {
                if (mvError) {
                    console.error(`Report rename error: ${mvError}`);
                    reject(mvError);
                    return;
                }
                console.log(`Report generated: ${reportPath}`);
                console.log(`mv stdout: ${mvStdout}`);
                console.error(`mv stderr: ${mvStderr}`);
                index++;
                resolve();
            });
        });
    });
}

rf();
