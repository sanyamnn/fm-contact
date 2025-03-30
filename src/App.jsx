import { useState } from "react";

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
      <li key={index} className="space-y-2 text-sm text-gray-700">❓ {faq}</li>
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-sm">🌐 Your region: <strong>{location}</strong></p>
        <button className="text-blue-600 text-sm underline" onClick={() => setShowMap(!showMap)}>Change</button>
      </div>
      {showMap && (
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm mb-2">Select your region:</p>
          <div className="grid grid-cols-2 gap-2">
            {["United States", "Europe", "Asia", "Other"].map((region) => (
              <button
                key={region}
                className="border rounded px-3 py-1 hover:bg-blue-100"
                onClick={() => {
                  setLocation(region);
                  setShowMap(false);
                }}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const personaSelector = (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(quickOptionsMap).map((key) => (
        <button
          key={key}
          className={`border rounded px-4 py-2 ${persona === key ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          onClick={() => handlePersonaSelect(key)}
        >
          {key === "prospect"
            ? "💼 I’m a prospective client"
            : key === "client"
            ? "🏢 I’m an existing FM Global client"
            : key === "broker"
            ? "📊 I’m a broker or business partner"
            : "❓ I’m not sure / other"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 relative animate-fade-in">
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
          onClick={() => setChatbotOpen(true)}
        >
          💬 Chat with us
        </button>
      </div>

      {chatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-xl p-4 w-full sm:w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setChatbotOpen(false)}
            >
              ❌
            </button>
            <h3 className="font-semibold text-lg mb-3">Chat with us</h3>
            <textarea placeholder="How can we assist you today?" className="mb-3 w-full p-2 border rounded" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded p-6 space-y-6">
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
      </div>

      {activeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setActiveForm("")}
            >
              ❌
            </button>
            <h4 className="font-semibold mb-2 text-lg">📝 {activeForm}</h4>
            <textarea
              placeholder={`Enter details for: ${activeForm}`}
              className="w-full p-2 border rounded"
              rows={4}
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="text-sm text-gray-600 underline"
                onClick={() => setActiveForm("")}
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
            </div>
          </div>
        </div>
      )}

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
