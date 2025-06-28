import React, { useState, useRef, useEffect } from 'react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
  };

  const handleExportChat = () => {
    const chatText = messages.map(m => `${m.sender === 'user' ? 'You' : 'Bot'}: ${m.text}`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen w-full py-8 px-2">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col" style={{ minHeight: 500 }}>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Chatbot</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-purple-100 text-right' : 'bg-gray-200 text-left'}`}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 rounded-lg bg-purple-700 text-white font-bold hover:bg-purple-800 transition"
          >
            Send
          </button>
          <button
            onClick={handleExportChat}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 