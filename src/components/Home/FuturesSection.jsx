/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  PieChart, 
  Cpu, 
  Layers, 
  BarChart2, 
  Crosshair, 
  Sliders 
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, details, activeFeature, onHover }) => {
  const isActive = activeFeature === title;

  return (
    <motion.div 
      onHoverStart={() => onHover(title)}
      className={`
        relative p-6 rounded-xl transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-blue-900/50 border-2 border-blue-600 shadow-2xl' 
          : 'bg-gray-900/30 hover:bg-blue-900/30 border-2 border-transparent'}
        cursor-pointer overflow-hidden
      `}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`
          mb-4 p-4 rounded-full transition-all duration-300
          ${isActive 
            ? 'bg-blue-600/30 text-blue-300' 
            : 'bg-gray-800/50 text-gray-400 group-hover:bg-blue-600/20 group-hover:text-blue-300'}
        `}>
          <Icon className="w-10 h-10" />
        </div>
        
        <h3 className={`
          text-xl font-semibold mb-2 transition-colors duration-300
          ${isActive ? 'text-blue-300' : 'text-gray-200 group-hover:text-blue-300'}
        `}>
          {title}
        </h3>
        
        <p className={`
          text-sm mb-4 transition-colors duration-300
          ${isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-200'}
        `}>
          {description}
        </p>
        
        {isActive && (
          <motion.ul 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 text-left w-full text-blue-100"
          >
            {details.map((detail, index) => (
              <li 
                key={index} 
                className="flex items-center space-x-2 text-sm"
              >
                <Crosshair className="w-4 h-4 text-blue-400" />
                <span>{detail}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState('Real-Time Trading');

  const features = [
    {
      icon: Zap,
      title: 'Real-Time Trading',
      description: 'Execute trades instantly with our lightning-fast platform',
      details: [
        'Millisecond order execution',
        'Multiple advanced order types',
        'Real-time market depth tracking'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Advanced Security',
      description: 'Bank-level encryption and multi-factor authentication',
      details: [
        '128-bit SSL encryption',
        'Two-factor authentication',
        'Cold storage for digital assets'
      ]
    },
    {
      icon: PieChart,
      title: 'Portfolio Analytics',
      description: 'Comprehensive insights and performance tracking',
      details: [
        'Real-time portfolio valuation',
        'Detailed performance metrics',
        'Advanced risk analysis tools'
      ]
    },
    {
      icon: Cpu,
      title: 'AI-Powered Insights',
      description: 'Intelligent market analysis and trading suggestions',
      details: [
        'Machine learning price predictions',
        'Automated trading strategy optimization',
        'Sentiment analysis integration'
      ]
    }
  ];

  return (
    <div className="bg-gray-950 text-white py-16 px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-blue-400"
        >
          Powerful Features for Modern Traders
        </motion.h2>
        
        <div className="grid md:grid-cols-4 gap-6 group">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              activeFeature={activeFeature}
              onHover={setActiveFeature}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;