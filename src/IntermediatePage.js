import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcessing } from './App';

const IntermediatePage = () => {
  const navigate = useNavigate();
  const { setIsProcessed } = useProcessing();
  // State for uploaded files (not used for processing yet)
  const [txtFile, setTxtFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  // State for sample processed files
  const [decoyData, setDecoyData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch sample processed files on mount
  useEffect(() => {
    fetch('/decoy_classification_azure.json')
      .then(res => res.json())
      .then(setDecoyData);
    fetch('/extracted_info_azure.json')
      .then(res => res.json())
      .then(setExtractedData);
  }, []);

  const handleProcessFiles = () => {
    setShowResults(true);
    setIsProcessed(true); // Enable chatbot access
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Intermediate File Processor</h2>
      <div className="flex flex-col gap-4 mb-8 w-full max-w-md">
        <label className="font-semibold mb-2 text-gray-700">Upload TXT File:
          <input
            type="file"
            accept=".txt"
            onChange={e => setTxtFile(e.target.files[0])}
            className="block w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </label>
        <label className="font-semibold mb-2 text-gray-700">Upload JSON File:
          <input
            type="file"
            accept=".json"
            onChange={e => setJsonFile(e.target.files[0])}
            className="block w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </label>
        <button
          className="mt-4 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!(txtFile && jsonFile)}
          onClick={handleProcessFiles}
        >
          Process Files
        </button>
        {showResults && (
          <button
            onClick={() => navigate('/chatbot')}
            className="mt-4 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow transition"
          >
            Go to Chatbot
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {showResults && txtFile && jsonFile && (
          <>
            {/* Decoy Classification Table */}
            <div className="flex-1 bg-white rounded-xl shadow p-6 border border-gray-200 overflow-auto max-h-[500px]">
              <h3 className="font-semibold mb-4 text-lg text-blue-700">Decoy Classification</h3>
              {decoyData ? (
                <div className="space-y-6">
                  {/* Admins Section */}
                  <h4 className="font-bold text-green-700 text-base mb-2">Admins</h4>
                  <table className="min-w-full text-xs md:text-sm border-collapse mb-4">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="border px-2 py-1">Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(decoyData)
                        .filter(([_, classification]) => classification === 'admin')
                        .map(([phone]) => (
                          <tr key={phone} className="even:bg-green-50">
                            <td className="border px-2 py-1 font-mono">{phone}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* Decoy Section */}
                  <h4 className="font-bold text-red-600 text-base mb-2">Decoy</h4>
                  <table className="min-w-full text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="bg-red-50">
                        <th className="border px-2 py-1">Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(decoyData)
                        .filter(([_, classification]) => classification === 'decoy')
                        .map(([phone]) => (
                          <tr key={phone} className="even:bg-red-50">
                            <td className="border px-2 py-1 font-mono">{phone}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-400">Loading...</div>
              )}
            </div>
            {/* Extracted Info Table/List */}
            <div className="flex-1 bg-white rounded-xl shadow p-6 border border-gray-200 overflow-auto max-h-[500px]">
              <h3 className="font-semibold mb-4 text-lg text-green-700">Extracted Info</h3>
              {extractedData ? (
                <div className="space-y-4">
                  {extractedData.map((item, idx) => (
                    <div key={idx} className="border-b pb-2 mb-2">
                      <div className="flex flex-wrap gap-4 items-center mb-1">
                        <span className="font-mono text-blue-700">{item.mobile_number}</span>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                      <div className="mb-1"><span className="font-semibold">Message:</span> <span className="text-gray-800">{
                        (() => {
                          let cleanedMsg = item.message;
                          Object.values(item.extracted).forEach(arr => {
                            if (Array.isArray(arr)) {
                              arr.forEach(val => {
                                if (val && typeof val === 'string' && val.length > 0) {
                                  // Remove all occurrences of the extracted value and @-prefixed version
                                  const patterns = [val, '@' + val.replace(/^@/, '')];
                                  patterns.forEach(pattern => {
                                    cleanedMsg = cleanedMsg.split(pattern).join(' ');
                                  });
                                }
                              });
                            }
                          });
                          // Clean up extra whitespace
                          return cleanedMsg.replace(/\s+/g, ' ').trim();
                        })()
                      }</span></div>
                      <div className="flex flex-col gap-1 text-xs mt-2">
                        {Object.entries(item.extracted).map(([key, arr]) => (
                          arr && arr.length > 0 ? (
                            <div key={key} className="mb-2">
                              <span className="font-semibold capitalize block">{key.replace('_', ' ')}:</span>
                              <ul className="list-disc ml-6">
                                {arr.map((val, i) => (
                                  <li key={i} className="font-mono text-gray-700">{val}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">Loading...</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IntermediatePage; 