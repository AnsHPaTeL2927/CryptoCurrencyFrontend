/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowLeft, Paperclip, Send, AlertCircle, Clock, Download } from 'lucide-react';

const TicketDetails = ({ ticket, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);

  // Example conversation history
  const conversation = [
    {
      id: 1,
      type: 'user',
      message: ticket.description,
      timestamp: ticket.created,
      attachments: [
        { name: 'screenshot.png', size: 245000 }
      ]
    },
    {
      id: 2,
      type: 'status',
      status: 'in_progress',
      message: 'Ticket assigned to support team',
      timestamp: '2024-02-19T11:30:00'
    },
    {
      id: 3,
      type: 'support',
      message: "Hello! I understand you're having issues with trade execution. Could you please provide more details about the error message you're seeing?",
      timestamp: '2024-02-19T11:35:00',
      agent: {
        name: 'Sarah Thompson',
        role: 'Support Agent'
      }
    },
    {
      id: 4,
      type: 'user',
      message: 'Yes, when I try to execute the trade, I get a "Timeout Error" message after about 30 seconds.',
      timestamp: '2024-02-19T11:40:00'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) return;
    
    // Handle message submission
    console.log('New message:', newMessage);
    console.log('Attachments:', attachments);
    
    // Clear form
    setNewMessage('');
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <button className="btn btn-ghost btn-sm mb-4" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tickets
        </button>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
            <div className="flex items-center gap-4 text-sm text-base-content/70">
              <span>Ticket #{ticket.id}</span>
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">Close Ticket</button>
            <button className="btn btn-primary btn-sm">Mark as Resolved</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Created</div>
            <div className="stat-value text-lg">{formatDate(ticket.created)}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Last Updated</div>
            <div className="stat-value text-lg">{formatDate(ticket.lastUpdate)}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg">
            <div className="stat-title">Category</div>
            <div className="stat-value text-lg capitalize">{ticket.category}</div>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 space-y-4 mb-6">
        {conversation.map(message => (
          <div 
            key={message.id} 
            className={`chat ${message.type === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            {message.type === 'status' ? (
              <div className="flex items-center justify-center w-full">
                <div className="bg-base-200 rounded-lg px-4 py-2 text-sm text-base-content/70">
                  {message.message}
                </div>
              </div>
            ) : (
              <>
                <div className="chat-image avatar placeholder">
                  <div className={`w-10 rounded-full ${
                    message.type === 'user' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    <span className="text-white">
                      {message.type === 'user' ? 'U' : 'S'}
                    </span>
                  </div>
                </div>
                <div className="chat-header mb-1">
                  {message.type === 'support' && message.agent ? (
                    <span className="font-bold">{message.agent.name}</span>
                  ) : (
                    <span className="font-bold">You</span>
                  )}
                  <time className="text-xs opacity-50 ml-2">
                    {formatDate(message.timestamp)}
                  </time>
                </div>
                <div className={`chat-bubble ${
                  message.type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
                }`}>
                  {message.message}
                </div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="chat-footer mt-2">
                    {message.attachments.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 text-sm bg-base-200 rounded-lg px-3 py-2"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>{file.name}</span>
                        <span className="text-base-content/50">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                        <button className="btn btn-ghost btn-xs">
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <form onSubmit={handleSubmit} className="bg-base-200 rounded-lg p-4">
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="btn btn-ghost btn-sm">
              <Paperclip className="w-4 h-4 mr-2" />
              Attach Files
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
            {attachments.length > 0 && (
              <span className="text-sm text-base-content/70">
                {attachments.length} file(s) selected
              </span>
            )}
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Reply
          </button>
        </div>
      </form>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    open: { color: 'badge-warning', icon: AlertCircle, label: 'Open' },
    in_progress: { color: 'badge-info', icon: Clock, label: 'In Progress' },
    resolved: { color: 'badge-success', icon: Clock, label: 'Resolved' },
    closed: { color: 'badge-error', icon: Clock, label: 'Closed' }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`badge gap-1 ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    low: 'badge-success',
    medium: 'badge-warning',
    high: 'badge-error'
  };

  return (
    <div className={`badge ${priorityConfig[priority]}`}>
      {priority.toUpperCase()}
    </div>
  );
};

export default TicketDetails;