import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [person, setPerson] = useState('');

  const [apiOutput, setApiOutput] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, person }),
    });

    const data = await response.json();
    const { output } = data;
    setApiOutput(oldArray => [`${output.text}`]);
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>How can I explain ___ to my
              <select className='selection' onChange={(event) => setPerson(event.target.value)}>
                <option value={"child"}>children</option>
                <option value={"grandparent"}>grandparents</option>
                <option value={"friend"}>friends</option>
                <option value={"parent"}>parents</option>
              </select>
              ?</h1>
          </div>
          <div className="header-subtitle">
            <h2>Simple explanations with simple analogies.</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Explain</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            apiOutput.map((output, index) => (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>{output}</h3>
                  </div>
                </div>
              </div>
            )
            ))}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
