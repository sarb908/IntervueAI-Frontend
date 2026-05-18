import React from "react";
import { ArrowRight, Star, Users, Award } from "lucide-react";

const CTA = () => {
  const ctaData = {
    headline: "Ready to Land Your Dream Job?",
    subtitle:
      "Join thousands of successful professionals who have mastered their interviews with IntervueAI. Start your journey to career success today.",
    trustIndicators: [
      {
        icon: Users,
        text: "10,000+ Users",
      },
      {
        icon: Star,
        text: "4.9/5 Rating",
      },
      {
        icon: Award,
        text: "95% Success Rate",
      },
    ],
    ctaButtons: [
      {
        text: "View Pricing",
        action: "scroll",
        target: "pricing",
      },
      {
        text: "Schedule a Demo",
        action: "modal",
      },
    ],
    guarantee: "✨ 7-day free trial • No credit card required • Cancel anytime",
    features: [
      {
        icon: "🚀",
        title: "Quick Setup",
        description: "Get started in less than 2 minutes",
      },
      {
        icon: "🎯",
        title: "Instant Results",
        description: "Get feedback immediately after each session",
      },
      {
        icon: "💼",
        title: "Career Success",
        description: "Land your dream job with confidence",
      },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {ctaData.headline}
          </h2>

          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            {ctaData.subtitle}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-blue-200">
            {ctaData.trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent size={20} />
                  <span className="text-sm">{indicator.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {ctaData.ctaButtons.map((button, index) => (
              <button
                key={index}
                className={`${
                  index === 0
                    ? "bg-white hover:bg-gray-100 text-blue-900 flex items-center justify-center gap-2"
                    : "border-2 border-white hover:bg-white hover:text-blue-900 text-white"
                } px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1`}
                data-action={button.action}
                data-target={button.target}
              >
                {button.text}
                {index === 0 && <ArrowRight size={20} />}
              </button>
            ))}
          </div>

          {/* Guarantee */}
          <p className="text-blue-200 text-sm">{ctaData.guarantee}</p>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctaData.features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-200 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;