/* eslint-disable react/prop-types */
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "tickets", label: "My Tickets" },
    { id: "create", label: "Create Ticket" },
    { id: "knowledge", label: "Knowledge Base" },
  ];

  return (
    <div className="tabs tabs-boxed mb-6">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
};


export default TabNavigation