import { useState } from "react";
import type { KeyboardEvent } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const initialMessage: Message = {
  id: 1,
  sender: "bot",
  text: "Hi! 👋 I'm the DroneTV Assistant. How can I help you today?",
};

const responses = {
  services:
    "DroneTV provides professional drone-related services. You can explore our Services section to learn more.",

  courses:
    "DroneTV offers drone training programs for different skill levels. Check our Courses section for more information.",

  contact:
    "You can contact the DroneTV team by submitting an enquiry through our Contact section.",

  register:
    "You can register your interest by submitting the enquiry form. Our team can then contact you with the next steps.",

  interested:
    "Great! Please submit your details through the enquiry form and mention the service you're interested in.",

  student:
    "Welcome! 🎓 You can explore our training programs in the Courses section and submit an enquiry for more information.",

  human:
    "Sure! Please submit an enquiry with your contact details and our team can get in touch with you.",

  fallback:
    "Sorry, I don't have information about that yet. Please try asking about our services, courses, registration, contact options, or speaking with someone.",
};

function getBotResponse(question: string): string {
  const text = question.trim().toLowerCase();

  // Services
  if (
    text.includes("service") ||
    text.includes("services") ||
    text.includes("what do you provide") ||
    text.includes("what does dronetv do")
  ) {
    return responses.services;
  }

  // Courses / Training
  if (
    text.includes("course") ||
    text.includes("courses") ||
    text.includes("training") ||
    text.includes("learn") ||
    text.includes("classes")
  ) {
    return responses.courses;
  }

  // Contact
  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("email") ||
    text.includes("reach you") ||
    text.includes("address")
  ) {
    return responses.contact;
  }

  // Registration
  if (
    text.includes("register") ||
    text.includes("registration") ||
    text.includes("sign up") ||
    text.includes("join")
  ) {
    return responses.register;
  }

  // Interested in a service
  if (
    text.includes("interested") ||
    text.includes("want a service") ||
    text.includes("need a service") ||
    text.includes("book a service")
  ) {
    return responses.interested;
  }

  // Student
  if (
    text.includes("student") ||
    text.includes("i am studying") ||
    text.includes("i'm studying")
  ) {
    return responses.student;
  }

  // Speak with someone
  if (
    text.includes("speak") ||
    text.includes("talk to someone") ||
    text.includes("human") ||
    text.includes("representative") ||
    text.includes("team member") ||
    text.includes("person")
  ) {
    return responses.human;
  }

  return responses.fallback;
}

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const question = input.trim();

    if (!question) return;

    const messageId = Date.now();

    const userMessage: Message = {
      id: messageId,
      sender: "user",
      text: question,
    };

    const botMessage: Message = {
      id: messageId + 1,
      sender: "bot",
      text: getBotResponse(question),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  const askQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <section className="chatbot-section" id="chatbot">
      <div className="chatbot-heading">
        <span>DRONETV SUPPORT</span>

        <h2>Ask Our Assistant</h2>

        <p>
          Get quick answers about our services, training programs and
          registration.
        </p>
      </div>

      <div className="chatbot">
        {/* Chat Header */}
        <div className="chatbot-header">
          <div className="bot-avatar">🤖</div>

          <div>
            <h3>DroneTV Assistant</h3>
            <span>● Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.sender}`}
            >
              <div className="message">
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={sendMessage} aria-label="Send message">
            ➤
          </button>
        </div>

        {/* Reset */}
        <button className="reset-button" onClick={resetConversation}>
          ↻ Reset Conversation
        </button>
      </div>

      {/* Suggested Questions */}
      <div className="suggested-questions">
        <p>Try asking:</p>

        <button
          onClick={() =>
            askQuestion("What services does DroneTV provide?")
          }
        >
          What services do you provide?
        </button>

        <button
          onClick={() =>
            askQuestion("What courses / training are available?")
          }
        >
          What courses are available?
        </button>

        <button
          onClick={() => askQuestion("How can I contact DroneTV?")}
        >
          How can I contact you?
        </button>

        <button
          onClick={() => askQuestion("How can I register?")}
        >
          How can I register?
        </button>

        <button
          onClick={() => askQuestion("I am a student.")}
        >
          I am a student
        </button>

        <button
          onClick={() => askQuestion("I am interested in a service.")}
        >
          I'm interested in a service
        </button>

        <button
          onClick={() => askQuestion("I want to speak with someone.")}
        >
          Speak with someone
        </button>
      </div>
    </section>
  );
}

export default Chatbot;