/* eslint-disable react/prop-types */
import { TicketPlus, MessageSquare, FileText } from 'lucide-react';
import QuickActionCard from './QuickActionCard';

const SupportOverview = ({ onTabChange }) => {
  const quickActions = [
    {
      title: "Create New Ticket",
      description: "Submit a new support request",
      icon: TicketPlus,
      buttonText: "Create Ticket",
      buttonClass: "btn-primary",
      action: () => onTabChange('create'),
      iconClass: "text-primary"
    },
    {
      title: "My Tickets",
      description: "View and manage your support tickets",
      icon: MessageSquare,
      buttonText: "View Tickets",
      buttonClass: "btn-info",
      action: () => onTabChange('tickets'),
      iconClass: "text-info"
    },
    {
      title: "Knowledge Base",
      description: "Browse helpful articles and guides",
      icon: FileText,
      buttonText: "Browse Articles",
      buttonClass: "btn-success",
      action: () => onTabChange('knowledge'),
      iconClass: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {quickActions.map((action, index) => (
        <QuickActionCard key={index} {...action} />
      ))}
    </div>
  );
};

export default SupportOverview