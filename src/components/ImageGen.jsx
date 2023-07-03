import React, { useState } from "react";


const API_TOKEN = "YOUR API KEY";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = output;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
  };
  

  return (<div className="container al-c mt-3">
    <h1>Visualize <span>It</span></h1>
    <p>Text-to-image generation is a cutting-edge technology that uses artificial intelligence to create realistic images based on textual descriptions. With this innovative tool, you can transform words into visuals, allowing you to bring your ideas to life and express yourself in new and exciting ways.</p>
    <form className="gen-form" onSubmit={handleSubmit}>
      <input type="text" name="input" placeholder="type your prompt here..." />
      <button type="submit">Generate</button>
    </form>
    <div>
    {loading && <div className="loading">Loading...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  />
         <button onClick={handleDownloadImage}>Download Image</button>
      </div>
    )}
    </div>

    </div>);
  
};

export default ImageGenerationForm;