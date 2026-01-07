import React, { useState } from "react";

const faqData = [
  {
    question: "What is PawMart?",
    answer:
      "PawMart is an online pet adoption and supply platform where users can adopt pets and purchase pet-related products.",
  },
  {
    question: "How can I adopt a pet?",
    answer:
      "Create an account and log in, choose your preferred pet, and contact the listing owner. The adoption process will follow the owner's terms.",
  },
  {
    question: "Is PawMart free to use?",
    answer:
      "Yes, browsing pets and viewing adoption listings is completely free. However, some premium services or product purchases may have charges.",
  },
  {
    question: "Can I list my pet for adoption or sale?",
    answer:
      "Yes, after logging in, use the 'Add Listing' option to list your pet or pet-related products.",
  },
  {
    question: "Does PawMart support Dark Mode?",
    answer:
      "Yes, PawMart supports Dark & Light mode which can be toggled from the navbar.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-5 bg-gray-50 dark:bg-gray-900 transition-colors">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm dark:shadow-black/20"
          >
            <button
              className="w-full text-left px-6 py-4 bg-white dark:bg-gray-800 flex justify-between items-center text-gray-900 dark:text-white font-medium focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="ml-2 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
