import React from 'react';

const GradientCard = ({ title, description, children, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Gradient background with hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-green-300 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-70 group-hover:opacity-90"></div>
      
      {/* Main card content */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300">
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-blue-100/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {title && (
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>
          )}
          {children}
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>
    </div>
  );
};

// Example usage component
export const GradientButton = ({ text, onClick, variant = "primary" }) => {
  const baseClasses = "relative group px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105";
  const variantClasses = {
    primary: "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-green-100 to-blue-100 text-green-700 hover:from-green-200 hover:to-blue-200 border border-green-200 hover:border-green-300"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} overflow-hidden`}
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
    </button>
  );
};

// Gradient stats card
export const GradientStatsCard = ({ title, value, icon: Icon, color = "green" }) => {
  const colorClasses = {
    green: "from-green-400 to-green-600",
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600"
  };

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}></div>
      <div className="relative bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-br ${colorClasses[color]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full w-0 group-hover:w-full transition-all duration-1000`}></div>
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
