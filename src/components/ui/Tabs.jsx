/* eslint-disable react/prop-types */
import { useState } from 'react';
import React from 'react';
export const Tabs = ({ children, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabs = [];
  const contents = {};

  // Organize children into tabs and contents
  React.Children.forEach(children, (child) => {
    if (child.type === TabsList) {
      tabs.push(child);
    } else if (child.type === TabsContent) {
      contents[child.props.value] = child;
    }
  });

  return (
    <div className={className}>
      {React.cloneElement(tabs[0], { activeTab, setActiveTab })}
      {contents[activeTab]}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab, className = '' }) => {
  return (
    <div role="tablist" className={`tabs tabs-boxed ${className}`}>
      {React.Children.map(children, (child) => (
        React.cloneElement(child, {
          active: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        })
      ))}
    </div>
  );
};

export const TabsTrigger = ({ children, value, active, onClick, className = '' }) => {
  return (
    <a
      role="tab"
      className={`tab ${active ? 'tab-active' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export const TabsContent = ({ children, value }) => {
  return (
    <div role="tabpanel" className="tab-content">
      {children}
    </div>
  );
};
