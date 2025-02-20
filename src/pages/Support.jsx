import { useState } from "react";
import SupportOverview from '../components/Support/SupportOverview'
import TabNavigation from "../components/Support/TabNavigation";
import TicketForm from "../components/Support/TicketForm";
import TicketList from "../components/Support/TicketList";
import KnowledgeBase from "../components/Support/KnowledgeBase";


const Support = () => {
  const [activeTab, setActiveTab] = useState('tickets');

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-base-content/70 mt-2">Get help with your trading issues and platform questions</p>
      </div>

      <SupportOverview onTabChange={setActiveTab} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-base-100 rounded-box p-6 shadow-lg">
        {activeTab === 'tickets' && <TicketList />}
        {activeTab === 'create' && <TicketForm />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
      </div>
    </div>
  );
};

export default Support;