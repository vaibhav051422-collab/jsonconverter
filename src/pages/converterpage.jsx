import React, { useState, useEffect } from 'react';

// --- Paste all the helper functions here ---
function inferType(value) { /* ... same as before ... */ }
function generateTypeScriptInterfaces(jsonObject, rootInterfaceName = 'RootObject') { /* ... same as before ... */ }

// --- The Converter Tool Component ---
export default function ConverterPage() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify({
    "id": 1, "user": "sample_user", "profile": { "followers": 150, "isVerified": true }, "posts": ["hello", "world"]
  }, null, 2));
  const [schemaOutput, setSchemaOutput] = useState('');
  const [error, setError] = useState('');
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaOutput);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  useEffect(() => {
    // ... same useEffect logic as before ...
  }, [jsonInput]);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">JSON to Schema Converter</h1>
      <main className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300">JSON Input</h3>
            </div>
            <textarea className="w-full h-96 p-4 font-mono text-sm bg-transparent border-0 focus:ring-0 resize-none" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
          </div>
          {/* Output Panel */}
          <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700">
             <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300">TypeScript Output</h3>
              <button onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50" disabled={!schemaOutput || error}>{copyText}</button>
            </div>
            <textarea className={`w-full h-96 p-4 font-mono text-sm bg-transparent border-0 resize-none ${error ? 'text-red-400' : ''}`} value={error || schemaOutput} readOnly />
          </div>
        </div>
      </main>
    </div>
  );
}