import { useState } from "react";

const AiScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ai-scanner/scan`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response:", data)
      setResult(data);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  return (
    <div>
      <h2>AI Food Scanner</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload & Analyze</button>
      </form>
      {result && <div><h3>Analysis Result:</h3><p>{JSON.stringify(result)}</p></div>}
    </div>
  );
};

export default AiScanner;
