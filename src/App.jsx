import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactExperience() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [persona, setPersona] = useState("");
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [location, setLocation] = useState("United States");
  const [showMap, setShowMap] = useState(false);
  const [activeForm, setActiveForm] = useState("");

  const faqContent = {
    prospect: [
      "How do I become an FM Global client?",
      "How do I request a quote?",
      "How do I contact sales?",
    ],
    client: [
      "How do I access the client portal?",
      "How do I report a claim?",
      "How do I update my policy?",
    ],
    broker: [
      "How do I contact FM Global for broker inquiries?",
      "Where can I access the Broker Portal?",
      "How do I submit client information?",
    ],
    unsure: [
      "How do I contact FM Global?",
      "Where is the nearest FM Global office?",
      "How do I get help with my inquiries?",
    ],
  };

  const renderFAQs = () => {
    const faqs = faqContent[persona] || faqContent.unsure;
    return faqs.map((faq, index) => (
      <li key={index} className="space-y-2 text-sm text-gray-700">
        {faq}
      </li>
    ));
  };

  const handlePersonaSelect = (value) => {
    setPersona(value);
    setStep(2);
  };

  const portalLinks = ["Access Client Portal", "Access Broker Portal"];

  const handleQuickAction = (label) => {
    if (portalLinks.includes(label)) {
      alert(`This link will take them to the ${label}.`);
    } else if (
      label === "Find an FM office (US or International)" ||
      label === "Get a quote"
    ) {
      setShowMap(true);
      setActiveForm(label);
    } else {
      setActiveForm(label);
    }
  };

  const quickOptionsMap = {
    prospect: [
      { label: "New business inquiry", description: "Interested in becoming a client? Start here." },
      { label: "Request a callback", description: "We’ll call you at your convenience." },
      { label: "Get a quote", description: "Talk to our sales team about your needs." },
      { label: "Ask a question", description: "Submit a quick inquiry to our team." },
    ],
    client: [
      { label: "Report a property loss", description: "Quickly file a property loss report." },
      { label: "Report an impairment", description: "Notify us about equipment or service issues." },
      { label: "FM hot work permit app support", description: "Get help with the Hot Work Permit App." },
      { label: "Resource catalog orders", description: "Request brochures or documentation." },
      { label: "Contact the RoofNav service desk", description: "Technical support for RoofNav." },
      { label: "Access Client Portal", description: "Log into the FM client area for full support." },
    ],
    broker: [
      { label: "Find an industry expert", description: "Locate the right contact by industry." },
      { label: "Ask a question (broker)", description: "General inquiries and broker support." },
      { label: "Access Broker Portal", description: "Sign in to manage clients and submissions." },
    ],
    unsure: [
      { label: "Find an FM office (US or International)", description: "Locate an FM Global office anywhere in the world." },
      { label: "General contact", description: "Submit a general inquiry to FM Global." },
      { label: "Explore Careers", description: "Learn about working at FM Global and view job openings." },
      { label: "Media contacts", description: "Reach our communications team." }
    ]
  };

  const renderQuickActions = () => (
    <div className="pt-6">
      <h3 className="text-md font-semibold mb-2">
        {persona === "prospect"
          ? "Let’s help you explore working with FM Global"
          : persona === "client"
          ? "Here’s how you can get what you need as a client"
          : persona === "broker"
          ? "Broker support: How can we help you today?"
          : persona === "unsure"
          ? "Not sure where to start? We're here to guide you."
          : "Let’s help you explore working with FM Global"}
      </h3>
      <ul className="space-y-2 text-sm text-gray-800 animate-fade-in">
        {(quickOptionsMap[persona] || quickOptionsMap.unsure).map((item, idx) => (
          <li
            key={idx}
            className="border rounded p-3 hover:bg-gray-100 cursor-pointer transition transform duration-300 ease-in-out"
            onClick={() => handleQuickAction(item.label)}
            title={item.description}
          >
            <strong>🔹 {item.label}</strong>
            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );

  const regionSelector = (
    <div className="flex items-center gap-2">
      <p className="text-sm">🌐 Your region: <strong>{location}</strong></p>
      <Button variant="link" className="text-sm -ml-1" onClick={() => setShowMap(true)}>Change</Button>
    </div>
  );

  const personaSelector = (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(quickOptionsMap).map((key) => (
        <Button
          key={key}
          variant={persona === key ? "default" : "outline"}
          onClick={() => handlePersonaSelect(key)}
        >
          {key === "prospect"
            ? "💼 I’m a prospective client"
            : key === "client"
            ? "🏢 I’m an existing FM Global client"
            : key === "broker"
            ? "📊 I’m a broker or business partner"
            : "❓ I’m not sure / other"}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 relative animate-fade-in">
      {/* Chatbot Button */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer z-50" onClick={() => setChatbotOpen(!chatbotOpen)}>
        💬 Chat with us
      </div>

      {chatbotOpen && (
        <div className="fixed bottom-0 right-0 bg-white shadow-lg rounded-t-xl p-4 w-full sm:w-96 z-50">
          <h3 className="font-semibold text-lg mb-3">Chat with us</h3>
          <Textarea placeholder="How can we assist you today?" className="mb-3" />
          <Button className="bg-blue-600 text-white">Send</Button>
        </div>
      )}

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">Let’s Get You to the Right Place</h2>
              <p className="text-sm text-gray-600">Tell us who you are so we can personalize your help experience.</p>
            </div>
            <div className="text-right">{regionSelector}</div>
          </div>

          {personaSelector}

          {persona === "" ? (
            <>
              <div className="pt-6">
                <h3 className="text-md font-semibold mb-2">Frequently Asked Questions</h3>
                <ul className="space-y-2 text-sm text-gray-700">{renderFAQs()}</ul>
              </div>
              {renderQuickActions()}
            </>
          ) : (
            <>
              {renderQuickActions()}
              <div className="pt-6">
                <h3 className="text-md font-semibold mb-2">Frequently Asked Questions</h3>
                <ul className="space-y-2 text-sm text-gray-700">{renderFAQs()}</ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="pt-6 border-t text-sm text-gray-600 space-y-2">
        <p className="font-medium">Need help right away?</p>
        <ul className="space-y-1">
          <li>📞 <a href="tel:1-800-FM-HELP" className="text-blue-600 underline">Call our support team</a></li>
          <li>❓ <span className="text-blue-600 underline cursor-pointer" onClick={() => handleQuickAction("General contact")}>Still can’t find what you need? Fill out a quick form</span></li>
          <li>📚 <span className="font-medium">Helpful Links:</span> <a href="#" className="text-blue-600 underline">Client Portal</a> | <a href="#" className="text-blue-600 underline">Broker Portal</a> | <a href="#" className="text-blue-600 underline">Claims Help</a> | <a href="#" className="text-blue-600 underline">Find an Office</a> | <a href="#" className="text-blue-600 underline">Careers</a></li>
        </ul>
      </div>
    </div>
  );
}
