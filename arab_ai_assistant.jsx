import React, { useState, useEffect } from 'react';
import { Send, Settings, BarChart3, MessageSquare, Zap, Copy, Check, ChevronRight, ArrowUp, Filter, Plus, Eye, EyeOff } from 'lucide-react';

export default function ArabicAIAssistant() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyName, setCompanyName] = useState('Acme Company');
  const [arabicTone, setArabicTone] = useState('friendly');
  const [responseGenerated, setResponseGenerated] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [plan, setPlan] = useState('pro');
  const [comments, setComments] = useState([
    { id: 1, username: 'احمد_محمد', text: 'المنتج رائع جداً! شكراً على الجودة العالية', platform: 'Instagram', likes: 245, timestamp: '2 mins ago', responded: false },
    { id: 2, username: 'fatima_design', text: 'سعر غالي شوي للعرض الحالي', platform: 'TikTok', likes: 89, timestamp: '15 mins ago', responded: false },
    { id: 3, username: 'khaled.tech', text: 'متى تطلقون النسخة الجديدة؟', platform: 'Twitter', likes: 156, timestamp: '45 mins ago', responded: false },
    { id: 4, username: 'laila_creative', text: 'أفضل خدمة استعملتها في السنة هذي ❤️', platform: 'Instagram', likes: 512, timestamp: '1 hour ago', responded: true },
  ]);

  const [selectedComment, setSelectedComment] = useState(null);
  const [autoRespond, setAutoRespond] = useState(true);
  const [brandGuidelines, setBrandGuidelines] = useState('احترام العملاء، استخدام اللهجة الودية، تجنب الوعود المستحيلة');

  const plans = {
    starter: { name: 'Starter', price: 99, responses: 100, platforms: 1, support: 'Email' },
    pro: { name: 'Pro', price: 299, responses: 1000, platforms: 3, support: '24/7 Chat' },
    enterprise: { name: 'Enterprise', price: 'Custom', responses: 'Unlimited', platforms: 'All', support: 'Dedicated Manager' }
  };

  // Simulate AI response generation
  const generateResponse = async (comment) => {
    setSelectedComment(comment.id);
    // In production, this would call your backend API which calls Claude
    const responses = {
      friendly: `شكراً لك على الملاحظة! 🙏 نقدر رأيك كثير، وسعيدين إنك استمتعت بخدمتنا. تواصل معنا دائماً إذا احتجت أي شي! ✨`,
      professional: `نشكرك على تقييمك. نحن ملتزمون بتقديم أفضل الخدمات. للاستفسارات أكثر، تفضل بالتواصل معنا عبر الـ DM.`,
      formal: `تقدرنا على ملاحظاتك الغالية. فريقنا دائماً مستعد للمساعدة والتطوير المستمر لنلبي احتياجاتك.`
    };
    setResponseGenerated(responses[arabicTone] || responses.friendly);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const markAsResponded = (commentId) => {
    setComments(comments.map(c => c.id === commentId ? { ...c, responded: true } : c));
    setSelectedComment(null);
  };

  const stats = [
    { label: 'Total Responses', value: '2,847', change: '+12%', icon: MessageSquare },
    { label: 'Engagement Rate', value: '18.4%', change: '+3.2%', icon: ArrowUp },
    { label: 'Response Time', value: '2.3s', change: '-0.8s', icon: Zap },
    { label: 'Customer Sentiment', value: '94% Positive', change: '+2.1%', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-700/50 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ArabiAI</h1>
              <p className="text-xs text-slate-400">Arabic Social Comment Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-slate-300">{companyName}</span>
            </div>
            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs font-semibold text-blue-300">
              {plans[plan].name}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative border-b border-slate-700/50 bg-slate-950/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'comments', label: 'Comments', icon: MessageSquare },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
              <p className="text-slate-400">Monitor your AI response performance across all platforms</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="group relative p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-xs font-semibold text-green-400">{stat.change}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Usage & Limits */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                <h3 className="text-lg font-bold text-white mb-6">Response Quota</h3>
                <div className="space-y-4">
                  {[
                    { platform: 'Instagram', used: 723, total: 1000 },
                    { platform: 'TikTok', used: 312, total: 1000 },
                    { platform: 'Twitter', used: 189, total: 1000 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">{item.platform}</span>
                        <span className="text-xs text-slate-400">{item.used}/{item.total}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all"
                          style={{ width: `${(item.used / item.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Your Plan</h3>
                <p className="text-3xl font-bold text-blue-400 mb-2">{plans[plan].name}</p>
                <p className="text-slate-400 text-sm mb-4">
                  {typeof plans[plan].price === 'number' ? `$${plans[plan].price}/mo` : plans[plan].price}
                </p>
                <div className="space-y-3 mb-6 text-sm">
                  <p className="text-slate-300">✓ {plans[plan].responses} responses/month</p>
                  <p className="text-slate-300">✓ {plans[plan].platforms} platforms</p>
                  <p className="text-slate-300">✓ {plans[plan].support} support</p>
                </div>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg font-semibold text-white text-sm transition-all">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COMMENTS TAB */}
        {activeTab === 'comments' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Pending Comments</h2>
                <p className="text-slate-400">AI-powered responses ready for approval</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-slate-600 text-slate-300 hover:text-white transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {comments.map(comment => (
                <div
                  key={comment.id}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${
                    selectedComment === comment.id
                      ? 'border-blue-500/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80'
                      : 'border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-slate-600/50'
                  }`}
                  onClick={() => setSelectedComment(comment.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-white">@{comment.username}</p>
                      <p className="text-xs text-slate-400">{comment.platform} • {comment.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                        {comment.likes} likes
                      </span>
                      {comment.responded && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">✓ Responded</span>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4 leading-relaxed">{comment.text}</p>

                  {selectedComment === comment.id && !comment.responded && (
                    <div className="space-y-4 border-t border-slate-700/50 pt-4">
                      <button
                        onClick={() => generateResponse(comment)}
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all"
                      >
                        <Zap className="w-4 h-4" />
                        Generate AI Response
                      </button>

                      {responseGenerated && (
                        <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                          <div className="flex items-start justify-between mb-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase">AI Suggested Response</p>
                            <button
                              onClick={() => copyToClipboard(responseGenerated, comment.id)}
                              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                            >
                              {copiedId === comment.id ? (
                                <>
                                  <Check className="w-4 h-4 text-green-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-slate-200 mb-4 leading-relaxed">{responseGenerated}</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => markAsResponded(comment.id)}
                              className="flex-1 py-2 px-4 bg-green-600/80 hover:bg-green-600 rounded-lg font-semibold text-white text-sm transition-all"
                            >
                              Post Response
                            </button>
                            <button
                              onClick={() => setResponseGenerated(null)}
                              className="flex-1 py-2 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg font-semibold text-slate-300 text-sm transition-all"
                            >
                              Regenerate
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
              <p className="text-slate-400">Configure your AI assistant preferences</p>
            </div>

            {/* Company Info */}
            <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              <h3 className="text-lg font-bold text-white mb-6">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Response Tone */}
            <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              <h3 className="text-lg font-bold text-white mb-6">Response Tone</h3>
              <div className="space-y-3">
                {['friendly', 'professional', 'formal'].map(tone => (
                  <label key={tone} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="tone"
                      value={tone}
                      checked={arabicTone === tone}
                      onChange={(e) => setArabicTone(e.target.value)}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <span className="text-slate-300 capitalize">{tone}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Guidelines */}
            <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              <h3 className="text-lg font-bold text-white mb-6">Brand Guidelines</h3>
              <p className="text-sm text-slate-400 mb-3">Help the AI understand your brand voice</p>
              <textarea
                value={brandGuidelines}
                onChange={(e) => setBrandGuidelines(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors resize-none h-32"
              />
            </div>

            {/* Auto Response */}
            <div className="p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Auto-Response</h3>
                  <p className="text-sm text-slate-400 mt-1">Automatically post responses without approval</p>
                </div>
                <button
                  onClick={() => setAutoRespond(!autoRespond)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${autoRespond ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${autoRespond ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg font-semibold text-white transition-all">
              Save Changes
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
