
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Sparkles, X, Loader2 } from 'lucide-react';

const LeadAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello! I'm your PMH Strategy Assistant. Tell me about your business challenge, and I'll suggest a potential approach." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use process.env.API_KEY directly for initialization as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are an expert marketing strategist for Punchline Marketing Hub (PMH), a consultancy in Nigeria. 
          Provide brief, data-driven, and professional marketing advice. 
          Keep responses under 3 sentences. 
          Always suggest that for a deeper analysis, they should 'Get an Audit' from the human experts at PMH. 
          Focus on Nigerian market dynamics.`,
        },
      });

      // Directly access .text property from GenerateContentResponse
      const aiText = response.text || "I'm sorry, I couldn't process that. Please contact our team directly!";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Service temporarily unavailable. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] overflow-hidden flex flex-col border border-gray-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-punchline-blue p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <Sparkles size={20} />
              <span className="font-bold font-heading">PMH AI Strategy</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-punchline-light">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  m.role === 'user' ? 'bg-punchline-blue text-white rounded-tr-none' : 'bg-white text-punchline-gray border border-gray-200 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm">
                  <Loader2 className="animate-spin text-punchline-blue" size={20} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for marketing advice..."
              className="flex-1 bg-punchline-light rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-punchline-blue/50"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-punchline-blue text-white p-2 rounded-full disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-punchline-blue text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center space-x-2 group"
        >
          <MessageSquare />
          <span className="hidden group-hover:block transition-all font-bold pr-2">PMH AI Chat</span>
        </button>
      )}
    </div>
  );
};

export default LeadAssistant;
