import { useState, useRef, useEffect } from 'react';
import { Loader2, Send } from 'lucide-react';
import logo from "../assets/images/logo.png";
import TaskLeed from "../assets/images/TaskLeed.png";
import Swal from "sweetalert2";

const OPENAI_API_KEY = "";

export default function ChatBot() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      message: "Hello, I'm CyberBot! Ask me anything about computer science!"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const systemMessage = {
    role: "system",
    content: "Explain things like you're a computer science field expert"
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', message: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    await processMessageToChatGPT(userMessage);
  };

  async function processMessageToChatGPT(userMessage) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            systemMessage,
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.message
            })),
            {
              role: userMessage.role,
              content: userMessage.message
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          const { code, message, param, type } = errorData.error;
          throw new Error(`Error Code: ${code}, Message: ${message}, Param: ${param}, Type: ${type}`);
        } else {
          throw new Error('Unknown API error');
        }
      }

      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response: No message content received');
      }

      const aiMessage = {
        role: 'assistant',
        message: data.choices[0].message.content.trim()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('ChatBot Error:', error.message);
      await Swal.fire({
        icon: "error",
        title: "Chat Error",
        text: error.message.includes('API') 
          ? "API Error: " + error.message 
          : "Sorry, I encountered an error. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-light py-5 overflow-hidden">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-6">
          <div className="card shadow-sm">
            <div className="card-body p-3">
              <div className="d-flex justify-content-start align-items-center mb-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="img-fluid"
                  style={{ width: "50px", padding: "5px" }}
                />
                <img
                  src={TaskLeed}
                  alt="TaskLeed"
                  className="img-fluid"
                  style={{ width: "110px" }}
                />
              </div>
              <div className="mb-3" style={{ height: '350px', overflowY: 'auto', marginTop: '30px' }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-2 p-2 rounded ${
                      msg.role === 'user'
                        ? 'bg-green-100 text-dark ms-auto'
                        : 'bg-light text-dark me-auto border'
                    }`}
                    style={{ maxWidth: '85%' }}
                  >
                    {msg.message}
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-2 p-2 rounded bg-light text-dark me-auto border" style={{ maxWidth: '80%' }}>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask about computer science..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSend}
                  disabled={isLoading}
                  style={{ width: '70px' }}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
