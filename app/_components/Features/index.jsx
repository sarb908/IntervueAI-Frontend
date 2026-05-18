import React from "react";
import {
  Bot,
  BarChart3,
  Settings,
  TrendingUp,
  MessageCircle,
  Award,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Mock Interviews",
      description:
        "Practice with realistic AI-driven interviewers that adapt to your responses and provide human-like conversation.",
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Instant Feedback & Scoring",
      description:
        "Get detailed analysis of your performance with actionable insights to identify strengths and areas for improvement.",
      color: "green",
    },
    {
      icon: Settings,
      title: "Customizable Interview Experience",
      description:
        "Choose from various roles, industries, difficulty levels, and interview types to match your career goals.",
      color: "purple",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking & Analytics",
      description:
        "Monitor your improvement over time with comprehensive analytics and performance metrics.",
      color: "orange",
    },
    {
      icon: MessageCircle,
      title: "Multi-Format Practice",
      description:
        "Practice behavioral, technical, case study, and situational interviews across different formats.",
      color: "indigo",
    },
    {
      icon: Award,
      title: "Industry-Specific Preparation",
      description:
        "Access tailored interview questions and scenarios for your specific industry and role level.",
      color: "emerald",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      indigo: "bg-indigo-500",
      emerald: "bg-emerald-500",
    };
    return colors[color];
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-blue-600">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools and insights you
            need to master any interview and land your dream job with
            confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${getColorClasses(
                    feature.color
                  )} rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                >
                  <IconComponent className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;