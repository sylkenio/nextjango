import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const cardTheme = {
  background: "bg-[#0b2412]/11 backdrop-blur-[2px]",
  border: "border border-[#5BFF8D]/40",
  shadow: "shadow-xl hover:shadow-2xl",
  rounded: "rounded-2xl",
  padding: "p-7",
  title: "text-2xl font-bold mb-2 text-[#7836C2] dark:text-[#5BFF8D]",
  description: "text-gray-200 dark:text-gray-300 text-base",
  icon: "mb-4 text-[#5BFF8D] text-4xl",
  transition: "transition-all duration-300",
  hover:
    "hover:-translate-y-2 hover:scale-105 hover:border-[#5BFF8D] hover:bg-[#0b2412]/25 cursor-default",
};

const Card: React.FC<CardProps> = ({ title, description, icon }) => (
  <div
    className={`
      ${cardTheme.background}
      ${cardTheme.border}
      ${cardTheme.shadow}
      ${cardTheme.rounded}
      ${cardTheme.padding}
      ${cardTheme.transition}
      ${cardTheme.hover}
      flex flex-col items-center justify-between aspect-[1/1] min-h-[260px] max-h-[340px] w-full
    `}
  >
    <div className={cardTheme.icon}>{icon}</div>
    <div className={cardTheme.title}>{title}</div>
    <div className={cardTheme.description}>{description}</div>
  </div>
);

export const Cards: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto mt-2">
    <Card
      title="Fast Setup"
      description="Get started quickly with minimal configuration and intuitive defaults."
      icon={<span>⚡</span>}
    />
    <Card
      title="Modern Design"
      description="Enjoy a clean, responsive interface that adapts to any device."
      icon={<span>🎨</span>}
    />
    <Card
      title="Secure & Reliable"
      description="Built with best practices for security and reliability in mind."
      icon={<span>🔒</span>}
    />
  </div>
);

export default Cards;
