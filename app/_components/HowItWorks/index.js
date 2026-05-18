"use client"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the AI feedback?",
    answer:
      "Our AI provides detailed feedback based on industry best practices, helping you improve your responses, communication, and technical accuracy.",
  },
  {
    question: "Can I practice for technical roles?",
    answer:
      "Yes, you can practice for software engineering, data science, product management, and many other technical roles.",
  },
  {
    question: "Is there a free version available?",
    answer:
      "Yes, we offer a free plan that allows you to try the platform and experience AI-powered interview practice.",
  },
  {
    question: "What types of interviews can I practice?",
    answer:
      "You can practice behavioral, technical, HR, leadership, and domain-specific interviews tailored to your target role.",
  },
  {
    question: "How does the AI interviewer work?",
    answer:
      "The AI asks interview questions, evaluates your answers, and provides instant feedback along with suggestions for improvement.",
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <h3 className="text-2xl font-semibold text-gray-900">
          {faq.question}
        </h3>

        <ChevronDown
          className={`w-7 h-7 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-8 pb-6 text-lg text-gray-600 leading-8">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Frequently Asked{" "}
            <span className="text-blue-600">Questions</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-9">
            Have questions? We've got answers. Can't find what you're looking
            for? Contact our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}