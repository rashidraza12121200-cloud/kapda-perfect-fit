import { useState, useRef, useEffect } from "react";
import { ArrowLeft, HelpCircle, Mail, Phone, Bot, Send, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

interface Message {
  role: "user" | "bot";
  text: string;
}

const botResponses: Record<string, string> = {
  "order": "You can track your order from Profile → My Orders → Track Order. If you need help with a specific order, please share the order ID.",
  "return": "We offer 7-day easy returns on readymade items. Custom-stitched items cannot be returned. Go to My Orders → select order → Cancel.",
  "stitch": "Custom stitching takes 5-7 business days. You can provide measurements on the product page and find a tailor near you!",
  "payment": "We accept UPI, Credit/Debit Cards, and Cash on Delivery. All payments are 100% secure.",
  "delivery": "Standard delivery takes 3-5 days. Custom stitch orders take 7-10 days. Free delivery on orders above ₹999!",
  "size": "Use our AI Fit feature on the home page for size recommendations, or provide custom measurements for a perfect fit.",
  "fabric": "We offer premium fabrics starting from ₹499/m. You can buy fabric only or get it custom-stitched through our platform.",
};

const getReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key)) return val;
  }
  return "I'm here to help! You can ask me about orders, returns, stitching, payments, delivery, sizes, or fabrics. For specific issues, email us at support@kapdaplus.com 😊";
};

const HelpSupport = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm Kapda+ Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getReply(userMsg) }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-4">
        <header className="flex items-center gap-3 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-serif text-xl font-bold text-foreground">Help & Support</h1>
        </header>

        {!showChat ? (
          <div className="space-y-3">
            <button onClick={() => setShowChat(true)}
              className="w-full bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-primary/15 transition-colors">
              <Bot className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Chat with AI Assistant</p>
                <p className="text-xs text-muted-foreground">Get instant answers to your questions</p>
              </div>
            </button>
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Email Us</p>
                <p className="text-xs text-muted-foreground">support@kapdaplus.com</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Call Us</p>
                <p className="text-xs text-muted-foreground">+91 1800-123-4567</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <HelpCircle className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">FAQs</p>
              <p className="text-xs text-muted-foreground">Find answers to common questions about orders, returns, and custom stitching.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col" style={{ height: "calc(100vh - 180px)" }}>
            <button onClick={() => setShowChat(false)} className="text-xs text-primary font-semibold mb-2 self-start">← Back to Help</button>
            <div className="flex-1 overflow-y-auto space-y-3 pb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === "user" ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEnd} />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {["Order help", "Return policy", "Custom stitch", "Payment", "Delivery"].map((q) => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="shrink-0 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <button onClick={handleSend} className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default HelpSupport;
