import React, { useState, useEffect } from 'react';
import { Bot, Zap, MessageSquare, Database, Globe, Bell, Users, Shield, FileText, Sparkles, Play, Download, Settings, Plus, Trash2, Check } from 'lucide-react';

const BarangayBotBuilder = () => {
  const [activeTab, setActiveTab] = useState('patterns');
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [connectors, setConnectors] = useState([]);
  const [botNodes, setBotNodes] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [buildProgress, setBuildProgress] = useState(0);

  const designPatterns = [
    {
      id: 'info-desk',
      name: 'Info Desk',
      icon: MessageSquare,
      color: 'bg-blue-500',
      description: 'Answer common questions about services, requirements, and schedules'
    },
    {
      id: 'document-tracker',
      name: 'Document Tracker',
      icon: FileText,
      color: 'bg-green-500',
      description: 'Track permits, clearances, and document requests'
    },
    {
      id: 'emergency-alert',
      name: 'Emergency Alert',
      icon: Bell,
      color: 'bg-red-500',
      description: 'Send real-time alerts for calamities, emergencies, and announcements'
    },
    {
      id: 'service-scheduler',
      name: 'Service Scheduler',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Schedule appointments, consultations, and community services'
    }
  ];

  const availableConnectors = [
    { id: 'dswd', name: 'DSWD API', icon: Shield, status: 'active', color: 'text-blue-600' },
    { id: 'philhealth', name: 'PhilHealth', icon: Plus, status: 'active', color: 'text-green-600' },
    { id: 'pagibig', name: 'Pag-IBIG', icon: Database, status: 'active', color: 'text-orange-600' },
    { id: 'lto', name: 'LTO', icon: Globe, status: 'active', color: 'text-red-600' },
    { id: 'weather', name: 'PAGASA Weather', icon: Zap, status: 'coming-soon', color: 'text-gray-400' },
    { id: 'sms', name: 'SMS Gateway', icon: MessageSquare, status: 'coming-soon', color: 'text-gray-400' }
  ];

  const simulateEvent = () => {
    const eventTypes = [
      { type: 'calamity', msg: '🚨 Typhoon Alert: Calamity fund release initiated for 500 families', priority: 'high' },
      { type: 'document', msg: '📄 New clearance request from Juan Dela Cruz', priority: 'medium' },
      { type: 'appointment', msg: '📅 Health consultation scheduled for tomorrow', priority: 'low' },
      { type: 'update', msg: '✅ DSWD assistance approved for case #2024-001', priority: 'medium' }
    ];
    
    const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    setEvents(prev => [...prev, { ...randomEvent, id: Date.now(), timestamp: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    if (selectedPattern && connectors.length > 0 && botNodes.length > 0) {
      const interval = setInterval(() => {
        setBuildProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [selectedPattern, connectors, botNodes]);

  const handlePatternSelect = (pattern) => {
    setSelectedPattern(pattern);
    setBotNodes(prev => [...prev, { id: Date.now(), pattern: pattern.name, type: 'pattern' }]);
  };

  const handleConnectorAdd = (connector) => {
    if (connector.status === 'active' && !connectors.find(c => c.id === connector.id)) {
      setConnectors(prev => [...prev, connector]);
      setBotNodes(prev => [...prev, { id: Date.now(), connector: connector.name, type: 'connector' }]);
    }
  };

  const handleRemoveNode = (nodeId) => {
    setBotNodes(prev => prev.filter(node => node.id !== nodeId));
  };

  const handleTestBot = () => {
    setShowPreview(true);
    setChatMessages([
      { sender: 'bot', text: 'Kumusta! I\'m your Barangay Assistant. How can I help you today?' },
      { sender: 'system', text: '✓ Connected to DSWD, PhilHealth, Pag-IBIG, LTO' }
    ]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, 
        { sender: 'user', text: 'How do I apply for barangay clearance?' },
        { sender: 'bot', text: 'I can help you with that! You need: Valid ID, Cedula, and ₱50 fee. Would you like me to schedule an appointment?' }
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 p-2 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BarangayBot Builder</h1>
                <p className="text-sm text-gray-600">Build your multi-agent chatbot in 10 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleTestBot}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Test Bot
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Deploy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-4">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('patterns')}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    activeTab === 'patterns' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Patterns
                </button>
                <button
                  onClick={() => setActiveTab('connectors')}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    activeTab === 'connectors' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Connectors
                </button>
              </div>
            </div>

            {/* Design Patterns */}
            {activeTab === 'patterns' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Design Patterns</h3>
                <div className="space-y-2">
                  {designPatterns.map(pattern => {
                    const Icon = pattern.icon;
                    return (
                      <button
                        key={pattern.id}
                        onClick={() => handlePatternSelect(pattern)}
                        className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`${pattern.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{pattern.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{pattern.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Connector Marketplace */}
            {activeTab === 'connectors' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  <Sparkles className="w-4 h-4 inline mr-2 text-yellow-500" />
                  Connector Marketplace
                </h3>
                <div className="space-y-2">
                  {availableConnectors.map(connector => {
                    const Icon = connector.icon;
                    const isAdded = connectors.find(c => c.id === connector.id);
                    return (
                      <button
                        key={connector.id}
                        onClick={() => handleConnectorAdd(connector)}
                        disabled={connector.status !== 'active' || isAdded}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          isAdded 
                            ? 'border-green-400 bg-green-50' 
                            : connector.status === 'active'
                            ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                            : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${connector.color}`} />
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{connector.name}</div>
                              <div className="text-xs text-gray-500">
                                {connector.status === 'active' ? 'Live' : 'Coming Soon'}
                              </div>
                            </div>
                          </div>
                          {isAdded && <Check className="w-5 h-5 text-green-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Progress */}
            {buildProgress > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Build Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${buildProgress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2">{buildProgress}% Complete</div>
              </div>
            )}
          </div>

          {/* Canvas Area */}
          <div className="col-span-6 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Bot Canvas</h3>
                <Settings className="w-5 h-5 text-gray-400" />
              </div>

              {botNodes.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Start building your bot</p>
                    <p className="text-sm text-gray-400">Select patterns and connectors from the sidebar</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {botNodes.map((node, index) => (
                    <div key={node.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
                        {index + 1}
                      </div>
                      <div className="flex-1 p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {node.pattern || node.connector}
                            </div>
                            <div className="text-xs text-gray-600">
                              {node.type === 'pattern' ? 'Design Pattern' : 'API Connector'}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveNode(node.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {index < botNodes.length - 1 && (
                        <div className="absolute left-1/2 ml-4 h-8 w-0.5 bg-blue-300" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Bot Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`${msg.sender === 'bot' ? 'text-left' : msg.sender === 'user' ? 'text-right' : 'text-center'}`}>
                      {msg.sender === 'system' ? (
                        <div className="text-xs text-green-600 bg-green-50 inline-block px-3 py-1 rounded-full">
                          {msg.text}
                        </div>
                      ) : (
                        <div className={`inline-block px-4 py-2 rounded-lg ${
                          msg.sender === 'bot' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-300 text-gray-900'
                        }`}>
                          {msg.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Events Stream */}
          <div className="col-span-3 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  <Zap className="w-4 h-4 inline mr-2 text-yellow-500" />
                  Event Stream
                </h3>
                <button
                  onClick={simulateEvent}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Simulate
                </button>
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {events.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-8">
                    No events yet. Click Simulate to test real-time responses.
                  </div>
                ) : (
                  events.slice().reverse().map(event => (
                    <div 
                      key={event.id} 
                      className={`p-3 rounded-lg border-l-4 ${
                        event.priority === 'high' 
                          ? 'border-red-500 bg-red-50' 
                          : event.priority === 'medium'
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="text-sm text-gray-900">{event.msg}</div>
                      <div className="text-xs text-gray-500 mt-1">{event.timestamp}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-lg p-4 text-white">
              <h3 className="font-semibold mb-3 text-sm">Powered By</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Flink SQL Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Event-Driven Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Stream Governance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangayBotBuilder;