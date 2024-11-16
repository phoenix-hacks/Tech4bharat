import React, { useState } from "react";
import '../css/PlagiarismChecker.css';

const PlagiarismChecker = () => {
  const [testRepo, setTestRepo] = useState("");
  const [referenceRepo, setReferenceRepo] = useState("");
  const [fileExtensions, setFileExtensions] = useState([".txt"]);
  const [result, setResult] = useState("");

  const handleAnalyze = () => {
    // Dummy logic for analysis (to be replaced with backend API calls)
    if (!testRepo || !referenceRepo) {
      alert("Please provide both test and reference repositories.");
      return;
    }
    setResult("Analysis in progress... (Mock data: No plagiarism detected!)");
  };

  const handleExtensionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFileExtensions((prev) => [...prev, value]);
    } else {
      setFileExtensions((prev) => prev.filter((ext) => ext !== value));
    }
  };

  return (
    <div className="plagiarism-checker-container">
      <h1>Manual Plagiarism Checker</h1>

      <div className="input-group">
        <label htmlFor="testRepo">Test Repository</label>
        <textarea
          id="testRepo"
          placeholder="Paste test text or file path here..."
          value={testRepo}
          onChange={(e) => setTestRepo(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="referenceRepo">Reference Repository</label>
        <textarea
          id="referenceRepo"
          placeholder="Paste reference text or file path here..."
          value={referenceRepo}
          onChange={(e) => setReferenceRepo(e.target.value)}
        />
      </div>

      <div className="file-extension-group">
        <label>File Extensions to Search:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value=".txt"
              checked={fileExtensions.includes(".txt")}
              onChange={handleExtensionChange}
            />
            .txt
          </label>
          <label>
            <input
              type="checkbox"
              value=".pdf"
              checked={fileExtensions.includes(".pdf")}
              onChange={handleExtensionChange}
            />
            .pdf
          </label>
          <label>
            <input
              type="checkbox"
              value=".docx"
              checked={fileExtensions.includes(".docx")}
              onChange={handleExtensionChange}
            />
            .docx
          </label>
        </div>
      </div>

      <button className="analyze-btn" onClick={handleAnalyze}>
        Analyze
      </button>

      {result && (
        <div className="result">
          <h2>Analysis Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
