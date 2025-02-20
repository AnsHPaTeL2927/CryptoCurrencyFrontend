/* eslint-disable react/prop-types */
// components/support/TicketList/TicketList.jsx
import { useState } from 'react';
import { Search, AlertCircle, Clock, CheckCircle2, XCircle, RefreshCw, ChevronDown, Eye, MessageSquare } from 'lucide-react';
import TicketDetails from './TicketDetails';

const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'created', direction: 'desc' });

  // Example ticket data
  const tickets = [
    {
      id: 'TKT-001',
      title: 'Unable to complete trade',
      status: 'open',
      priority: 'high',
      category: 'trading',
      created: '2024-02-19T10:30:00',
      lastUpdate: '2024-02-20T14:20:00',
      messages: 3,
      description: 'Trade execution failing with timeout error...'
    },
    {
      id: 'TKT-002',
      title: 'Withdrawal stuck in pending',
      status: 'in_progress',
      priority: 'medium',
      category: 'payment',
      created: '2024-02-18T15:45:00',
      lastUpdate: '2024-02-19T09:15:00',
      messages: 5,
      description: 'Withdrawal initiated but stuck in pending state...'
    },
    {
      id: 'TKT-003',
      title: 'Account verification issue',
      status: 'resolved',
      priority: 'low',
      category: 'account',
      created: '2024-02-17T08:20:00',
      lastUpdate: '2024-02-18T11:30:00',
      messages: 4,
      description: 'Unable to complete account verification process...'
    }
  ];

  // Filtering logic
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sorting logic
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortConfig.key === 'created' || sortConfig.key === 'lastUpdate') {
      return sortConfig.direction === 'asc' 
        ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
        : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
    }
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key].localeCompare(b[sortConfig.key])
      : b[sortConfig.key].localeCompare(a[sortConfig.key]);
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div>
      {selectedTicket ? (
        <TicketDetails 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
        />
      ) : (
        <>
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
              <input
                type="text"
                placeholder="Search tickets by ID or title..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select 
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select 
                className="select select-bordered"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="overflow-x-auto bg-base-100 rounded-lg">
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th onClick={() => handleSort('id')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      ID
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        sortConfig.key === 'id' && sortConfig.direction === 'asc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  <th onClick={() => handleSort('title')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      Title
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        sortConfig.key === 'title' && sortConfig.direction === 'asc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th onClick={() => handleSort('created')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      Created
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        sortConfig.key === 'created' && sortConfig.direction === 'asc' ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </th>
                  <th>Last Update</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTickets.map(ticket => (
                  <tr key={ticket.id} className="hover">
                    <td className="font-mono">{ticket.id}</td>
                    <td>
                      <div>
                        <div className="font-medium">{ticket.title}</div>
                        <div className="text-sm text-base-content/60">
                          {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td>
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td>
                      <div>
                        {new Date(ticket.created).toLocaleDateString()}
                        <div className="text-sm text-base-content/60">
                          {new Date(ticket.created).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {new Date(ticket.lastUpdate).toLocaleDateString()}
                        <div className="text-sm text-base-content/60">
                          {new Date(ticket.lastUpdate).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-ghost btn-sm tooltip" 
                          data-tip="View Details"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <div className="tooltip" data-tip={`${ticket.messages} Messages`}>
                          <div className="badge gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {ticket.messages}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {sortedTickets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-base-content/60">
                      No tickets found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Stats Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Total Tickets</div>
              <div className="stat-value">{tickets.length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Open Tickets</div>
              <div className="stat-value">
                {tickets.filter(t => t.status === 'open').length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">In Progress</div>
              <div className="stat-value">
                {tickets.filter(t => t.status === 'in_progress').length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Resolved</div>
              <div className="stat-value">
                {tickets.filter(t => t.status === 'resolved').length}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    open: { color: 'badge-warning', icon: AlertCircle, label: 'Open' },
    in_progress: { color: 'badge-info', icon: Clock, label: 'In Progress' },
    resolved: { color: 'badge-success', icon: CheckCircle2, label: 'Resolved' },
    closed: { color: 'badge-error', icon: XCircle, label: 'Closed' },
    reopened: { color: 'badge-secondary', icon: RefreshCw, label: 'Reopened' }
  };

  const config = statusConfig[status] || statusConfig.open;
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

export default TicketList;