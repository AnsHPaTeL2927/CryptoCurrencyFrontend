/* eslint-disable react/prop-types */
import React from 'react';
import { Camera, ChevronRight, Loader } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'default',
  size = 'md',
  theme = 'light',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
  ...props 
}) => {
  // Base classes with responsive design
  const baseClasses = 'btn font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 transform hover:scale-[1.02] active:scale-[0.98]';

  // Responsive size classes
  const sizeClasses = {
    sm: 'btn-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5',
    md: 'btn-md text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-2.5',
    lg: 'btn-lg text-base sm:text-lg px-4 sm:px-6 py-2.5 sm:py-3'
  };

  // Responsive variant classes for light theme
  const lightVariantClasses = {
    default: 'btn-ghost bg-gray-100 hover:bg-gray-200 focus:ring-gray-200 text-gray-900',
    primary: 'btn-primary hover:bg-primary-600 focus:ring-primary-300 text-white',
    secondary: 'btn-secondary hover:bg-secondary-600 focus:ring-secondary-300 text-white',
    accent: 'btn-accent hover:bg-accent-600 focus:ring-accent-300 text-white',
    ghost: 'btn-ghost hover:bg-gray-100 focus:ring-gray-200 text-gray-900'
  };

  // Responsive variant classes for dark theme
  const darkVariantClasses = {
    default: 'btn-ghost bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 text-white',
    primary: 'btn-primary hover:bg-primary-700 focus:ring-primary-800 text-white',
    secondary: 'btn-secondary hover:bg-secondary-700 focus:ring-secondary-800 text-white',
    accent: 'btn-accent hover:bg-accent-700 focus:ring-accent-800 text-white',
    ghost: 'btn-ghost hover:bg-gray-700 focus:ring-gray-700 text-white'
  };

  // Icon sizing based on button size
  const getIconSize = () => {
    switch(size) {
      case 'sm': return 16;
      case 'lg': return 24;
      default: return 20;
    }
  };

  // Loading state classes
  const loadingClasses = loading ? 'loading loading-spinner relative' : '';

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : 'w-auto';

  // Disabled state classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';

  // Spacing classes for icons
  const iconSpacingClasses = {
    left: leftIcon ? 'pl-2' : '',
    right: rightIcon ? 'pr-2' : ''
  };

  // Combine all classes
  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    theme === 'light' ? lightVariantClasses[variant] : darkVariantClasses[variant],
    widthClasses,
    loadingClasses,
    disabledClasses,
    iconSpacingClasses.left,
    iconSpacingClasses.right,
    'inline-flex items-center justify-center gap-2',
    className
  ].join(' ');

  // Get current icon size
  const iconSize = getIconSize();

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader size={iconSize} className="animate-spin" />
      ) : (
        <>
          {leftIcon && React.cloneElement(leftIcon, { size: iconSize })}
          {children}
          {rightIcon && React.cloneElement(rightIcon, { size: iconSize })}
        </>
      )}
    </button>
  );
};

export default Button;