import React, { useState } from 'react';
import '../css/ditector.css'; // Importing CSS for styling

const PlagiarismChecker = () => {
  const [repo1File, setRepo1File] = useState(null);
  const [repo2File, setRepo2File] = useState(null);
  const [result, setResult] = useState(null);

  // Function to handle file selection for Repository 1
  const handleRepo1FileChange = (e) => {
    setRepo1File(e.target.files[0]);
  };

  // Function to handle file selection for Repository 2
  const handleRepo2FileChange = (e) => {
    setRepo2File(e.target.files[0]);
  };

  // Function to compare files and check for plagiarism
  const checkPlagiarism = () => {
    if (!repo1File || !repo2File) {
      alert('Please select both files.');
      return;
    }

    // Simulate plagiarism check (in real scenarios, you would use a library or API to compare contents)
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = () => {
      reader2.onload = () => {
        const content1 = reader1.result;
        const content2 = reader2.result;

        // Simple plagiarism check: comparing contents as strings
        if (content1 === content2) {
          setResult('Files are identical! Plagiarism detected.');
        } else {
          setResult('Files are different. No plagiarism detected.');
        }
      };
      reader2.readAsText(repo2File);
    };
    reader1.readAsText(repo1File);
  };

  // Check if both files are selected
  const isAnalyzeDisabled = !repo1File || !repo2File;

  return (
    <div className="plagiarism-container">
      <h2>Plagiarism Checker</h2>
      <div className="file-upload-container">
        <div className="file-upload">
          <input type="file" id="repo1File" onChange={handleRepo1FileChange} />
          <label htmlFor="repo1File">Upload file from Repository 1</label>
        </div>
        <div className="file-upload">
          <input type="file" id="repo2File" onChange={handleRepo2FileChange} />
          <label htmlFor="repo2File">Upload file from Repository 2</label>
        </div>
      </div>

      <button className="check-btn" onClick={checkPlagiarism} disabled={isAnalyzeDisabled}>
        Analyze
      </button>

      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default PlagiarismChecker;
