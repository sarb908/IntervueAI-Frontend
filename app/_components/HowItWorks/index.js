import React from 'react'

import React from "react";
import { UserPlus, Play, BarChart, RefreshCw, ArrowRight } from "lucide-react";

const HowItWorks = () => {

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Choose Your Role",
      description:
        "Create your account and select your target job role, industry, and experience level to get personalized interview questions.",
      color: "blue",
    },
    {
      icon: Play,
      title: "Start Your AI Mock Interview",
      description:
        "Begin your practice session with our AI interviewer. Answer questions via video, audio, or text based on your preference.",
      color: "green",
    },
    {
      icon: BarChart,
      title: "Receive Instant Feedback",
      description:
        "Get detailed analysis of your performance including communication skills, technical knowledge, and areas for improvement.",
      color: "purple",
    },
    {
      icon: RefreshCw,
      title: "Practice & Improve",
      description:
        "Repeat interviews to track your progress, build confidence, and master different question types and scenarios.",
      color: "orange",
    },
  ];

  const getColorClasses = (color, type = "bg") => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500",
        border: "border-blue-200",
        text: "text-blue-600",
      },
      green: {
        bg: "bg-green-500",
        border: "border-green-200",
        text: "text-green-600",
      },
      purple: {
        bg: "bg-purple-500",
        border: "border-purple-200",
        text: "text-purple-600",
      },
      orange: {
        bg: "bg-orange-500",
        border: "border-orange-200",
        text: "text-orange-600",
      },
    };
    return colorMap[color]?.[type] || colorMap.blue[type];
  };

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes and begin improving your interview skills
            with our simple 4-step process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${getColorClasses(
                      step.color
                    )} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="text-white" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
            </button>
            <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;