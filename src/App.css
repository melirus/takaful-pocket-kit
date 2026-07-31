import React, { useState } from 'react';
import { ShieldAlert, Send, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tax');
  
  // Inputs
  const [income, setIncome] = useState(60000);
  const [taxBracket, setTaxBracket] = useState(13); // 13% tax bracket default
  const [age, setAge] = useState(30);
  const [expenses, setExpenses] = useState(4000);
  const [hasSon, setHasSon] = useState(false);

  // Calculations
  const taxSavings = (3000 * (taxBracket / 100)).toFixed(0);
  const realMonthlyCost = (250 - (taxSavings / 12)).toFixed(0);
  const coverageNeeded = expenses * 12 * 10; // 10 years expense replacement
  const delayPenalty = (age * 180).toFixed(0); // Approximate delay cost metric

  // WhatsApp Handler
  const handleWhatsAppShare = () => {
    const text = `*Takaful & Tax Relief Analysis Summary*

Hi! Great meeting you today. Here is your quick financial snapshot:

*Tax Relief Saving:* RM ${taxSavings} refund/year
*Real Cost for RM 3,000 Plan:* ~RM ${realMonthlyCost}/month (after tax back)
*Income Protection Gap:* RM ${coverageNeeded.toLocaleString()}

*Note on Faraid:* ${hasSon ? 'Standard distribution applies.' : '⚠️ No sons in family: Up to 37.5% estate goes to extended relatives without Hibah.'}

Let's schedule 15 mins to lock in your rates before your next birthday!`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-800 pb-10 flex flex-col justify-between font-sans">
      
      {/* Top Header */}
      <div>
        <header className="bg-emerald-700 text-white p-4 shadow-md rounded-b-xl">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Calculator className="w-5 h-5" /> Takaful Advisor Pocket Kit
          </h1>
          <p className="text-xs text-emerald-100 mt-1">Direct Approach Quick Assessment</p>
        </header>

        {/* Tab Selection */}
        <div className="flex border-b bg-white text-xs font-semibold">
          <button 
            onClick={() => setActiveTab('tax')}
            className={`flex-1 py-3 text-center border-b-2 ${activeTab === 'tax' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-gray-500'}`}>
            💰 Tax Relief
          </button>
          <button 
            onClick={() => setActiveTab('income')}
            className={`flex-1 py-3 text-center border-b-2 ${activeTab === 'income' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-gray-500'}`}>
            🛡️ Protection
          </button>
          <button 
            onClick={() => setActiveTab('faraid')}
            className={`flex-1 py-3 text-center border-b-2 ${activeTab === 'faraid' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-gray-500'}`}>
            ⚖️ Faraid Alert
          </button>
        </div>

        {/* Main Content Area */}
        <main className="p-4 space-y-4">
          
          {/* TAB 1: TAX CALCULATOR */}
          {activeTab === 'tax' && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-700">LHDN Tax Discount Calculator</h2>
              <div>
                <label className="text-xs text-gray-500 block">Estimated Annual Income (RM)</label>
                <input 
                  type="number" 
                  value={income} 
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full mt-1 p-2 border rounded-lg text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block">Tax Bracket Rate (%)</label>
                <select 
                  value={taxBracket} 
                  onChange={(e) => setTaxBracket(Number(e.target.value))}
                  className="w-full mt-1 p-2 border rounded-lg text-sm font-semibold bg-white"
                >
                  <option value={8}>8% (Income RM 35k-50k)</option>
                  <option value={13}>13% (Income RM 50k-70k)</option>
                  <option value={21}>21% (Income RM 70k-100k)</option>
                  <option value={24}>24% (Income RM 100k+)</option>
                </select>
              </div>

              {/* Output Box */}
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center">
                <p className="text-xs text-emerald-800 font-medium">Estimated Tax Refund Received</p>
                <p className="text-2xl font-extrabold text-emerald-600 mt-1">RM {taxSavings}</p>
                <p className="text-[10px] text-emerald-700 mt-1">
                  Effective plan cost: <span className="font-bold">RM {realMonthlyCost}/month</span> instead of RM 250/month!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: INCOME PROTECTION */}
          {activeTab === 'income' && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-700">Income Protection Gap</h2>
              <div>
                <label className="text-xs text-gray-500 block">Your Age</label>
                <input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full mt-1 p-2 border rounded-lg text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block">Monthly Family Expenses (RM)</label>
                <input 
                  type="number" 
                  value={expenses} 
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full mt-1 p-2 border rounded-lg text-sm font-semibold"
                />
              </div>

              <div className="bg-slate-100 p-3 rounded-lg text-center">
                <p className="text-xs text-slate-500">10-Year Protection Needed</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">RM {coverageNeeded.toLocaleString()}</p>
              </div>

              {/* Shock Feature embedded */}
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                <div className="flex items-center gap-1 text-red-700 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" /> Age Penalty Alert
                </div>
                <p className="text-[11px] text-red-600 mt-1">
                  Delaying enrollment until age {age + 1} adds roughly <span className="font-bold underline">RM {delayPenalty}</span> extra in cumulative lifetime premiums for the exact same coverage.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: FARAID ALERT */}
          {activeTab === 'faraid' && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-700">Faraid & Hibah Quick Check</h2>
              
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-xs font-medium text-slate-600">Do you have at least one Son?</span>
                <input 
                  type="checkbox" 
                  checked={hasSon} 
                  onChange={(e) => setHasSon(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </div>

              {!hasSon ? (
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5 text-red-800 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    HIGH RISK OF ESTATE FREEZE
                  </div>
                  <p className="text-[11px] text-red-700 leading-relaxed">
                    Without a male heir, <strong>up to 37.5%</strong> of your savings/property goes to extended male relatives (uncles/brothers). 
                  </p>
                  <p className="text-[10px] text-red-600 font-semibold">
                    💡 Solution: A Hibah Takaful policy bypasses probate completely, delivering 100% cash to your wife within 14 days.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <p className="text-xs text-emerald-800">Sons act as Asabah (residuaries). Hibah is still recommended for instant liquidity.</p>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Action Button */}
      <div className="p-4 bg-white border-t border-slate-200">
        <button 
          onClick={handleWhatsAppShare}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all active:scale-95">
          <Send className="w-4 h-4" /> Send Summary via WhatsApp
        </button>
      </div>

    </div>
  );
}