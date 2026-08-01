import React, { useState } from 'react';
import { Send, ShieldAlert, CheckCircle2, Calculator, Wallet, HeartHandshake, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('faraid');

  // --- 1. STATE PERLINDUNGAN PENDAPATAN ---
  const [debt, setDebt] = useState('');
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(3.5);
  const [education, setEducation] = useState('');
  const [existingAssets, setExistingAssets] = useState('');

  // --- 2. STATE PELEPASAN CUKAI LHDN ---
  const [annualIncome, setAnnualIncome] = useState(60000);
  const [taxBracket, setTaxBracket] = useState(13);
  const [takafulContribution, setTakafulContribution] = useState(3000);

  // --- 3. STATE FARAID TERPERINCI ---
  const [totalEstate, setTotalEstate] = useState(300000); // Jumlah Harta (RM)
  const [spouseType, setSpouseType] = useState('wife'); // 'wife', 'husband', 'none'
  const [hasFather, setHasFather] = useState(true);
  const [hasMother, setHasMother] = useState(true);
  const [sonsCount, setSonsCount] = useState(1);
  const [daughtersCount, setDaughtersCount] = useState(1);
  const [brothersCount, setBrothersCount] = useState(0);
  const [sistersCount, setSistersCount] = useState(0);

  // --- PENGIRAAN 1: PERLINDUNGAN PENDAPATAN ---
  const numDebt = Number(debt) || 0;
  const numExpense = Number(monthlyExpense) || 0;
  const numInflation = Number(inflationRate) || 0;
  const numEducation = Number(education) || 0;
  const numAssets = Number(existingAssets) || 0;

  let totalLivingExpense = 0;
  const annualExpense = numExpense * 12;
  for (let y = 1; y <= years; y++) {
    totalLivingExpense += annualExpense * Math.pow(1 + numInflation / 100, y);
  }

  const totalProtectionNeeded = Math.max(
    0,
    numDebt + totalLivingExpense + numEducation - numAssets
  );

  // --- PENGIRAAN 2: CUKAI LHDN ---
  const taxSavings = (takafulContribution * (taxBracket / 100)).toFixed(0);
  const monthlyTakaful = takafulContribution / 12;
  const realMonthlyCost = (monthlyTakaful - (taxSavings / 12)).toFixed(0);

  // --- PENGIRAAN 3: ENJIN FARAID TERPERINCI ---
  const calculateFaraid = () => {
    const estate = Number(totalEstate) || 0;
    const hasChildren = sonsCount > 0 || daughtersCount > 0;
    const totalSiblings = brothersCount + sistersCount;

    let shares = [];
    let allocatedFraction = 0;

    // 1. Pasangan (Isteri / Suami)
    if (spouseType === 'wife') {
      const shareFrac = hasChildren ? 1 / 8 : 1 / 4;
      allocatedFraction += shareFrac;
      shares.push({
        label: hasChildren ? 'Isteri (1/8)' : 'Isteri (1/4)',
        fraction: shareFrac,
        amount: estate * shareFrac,
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      });
    } else if (spouseType === 'husband') {
      const shareFrac = hasChildren ? 1 / 2 : 1 / 1; // Simplifikasi ringkas
      const actualFrac = hasChildren ? 1 / 2 : 1 / 2;
      allocatedFraction += actualFrac;
      shares.push({
        label: hasChildren ? 'Suami (1/2)' : 'Suami (1/2)',
        fraction: actualFrac,
        amount: estate * actualFrac,
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      });
    }

    // 2. Bapa
    if (hasFather) {
      const shareFrac = 1 / 6;
      allocatedFraction += shareFrac;
      shares.push({
        label: 'Bapa (1/6)',
        fraction: shareFrac,
        amount: estate * shareFrac,
        color: 'bg-blue-100 text-blue-900 border-blue-300',
      });
    }

    // 3. Ibu
    if (hasMother) {
      const shareFrac = hasChildren || totalSiblings >= 2 ? 1 / 6 : 1 / 3;
      allocatedFraction += shareFrac;
      shares.push({
        label: hasChildren || totalSiblings >= 2 ? 'Ibu (1/6)' : 'Ibu (1/3)',
        fraction: shareFrac,
        amount: estate * shareFrac,
        color: 'bg-purple-100 text-purple-900 border-purple-300',
      });
    }

    // Baki untuk Asabah (Waris Baki)
    const residueFraction = Math.max(0, 1 - allocatedFraction);
    const residueAmount = estate * residueFraction;

    // 4. Anak-anak (Asabah Bil Ghair)
    if (hasChildren) {
      if (sonsCount > 0) {
        // Anak lelaki ada -> Baki dibahagikan 2 nisbah anak lelaki : 1 nisbah anak perempuan
        const totalUnits = sonsCount * 2 + daughtersCount * 1;
        const unitValue = residueAmount / totalUnits;

        if (sonsCount > 0) {
          shares.push({
            label: `Anak Lelaki (${sonsCount} org) [Nisbah 2x]`,
            fraction: (residueFraction * (sonsCount * 2)) / totalUnits,
            amount: unitValue * 2 * sonsCount,
            color: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
          });
        }
        if (daughtersCount > 0) {
          shares.push({
            label: `Anak Perempuan (${daughtersCount} org) [Nisbah 1x]`,
            fraction: (residueFraction * daughtersCount) / totalUnits,
            amount: unitValue * 1 * daughtersCount,
            color: 'bg-amber-50 text-amber-800 border-amber-200',
          });
        }
      } else {
        // Hanya anak perempuan sahaja (Tiada anak lelaki)
        const daughterFrac = daughtersCount === 1 ? 1 / 2 : 2 / 3;
        const actualDaughterAmt = Math.min(residueAmount, estate * daughterFrac);
        shares.push({
          label: daughtersCount === 1 ? 'Anak Perempuan Tunggal (1/2)' : `Anak Perempuan (${daughtersCount} org) [2/3]`,
          fraction: daughterFrac,
          amount: actualDaughterAmt,
          color: 'bg-amber-100 text-amber-900 border-amber-300',
        });

        // BAKI PERGI KEPADA ADIK-BERADIKS / BAPA SAUDARA (RISIKO SHOCK)
        const remainingUnassigned = residueAmount - actualDaughterAmt;
        if (remainingUnassigned > 0) {
          if (brothersCount > 0 || sistersCount > 0) {
            shares.push({
              label: `Adik-Beradik Si Mati (Waris Baki)`,
              fraction: remainingUnassigned / estate,
              amount: remainingUnassigned,
              color: 'bg-red-100 text-red-900 border-red-300 font-bold',
              isWarning: true,
            });
          } else {
            shares.push({
              label: `Bapa Saudara / Baitulmal (Baki Waris)`,
              fraction: remainingUnassigned / estate,
              amount: remainingUnassigned,
              color: 'bg-red-100 text-red-900 border-red-300 font-bold',
              isWarning: true,
            });
          }
        }
      }
    } else {
      // Tiada Anak -> Baki kepada Adik-Beradik
      if (brothersCount > 0 || sistersCount > 0) {
        shares.push({
          label: `Adik-Beradik (${totalSiblings} org)`,
          fraction: residueFraction,
          amount: residueAmount,
          color: 'bg-red-100 text-red-900 border-red-300 font-bold',
          isWarning: true,
        });
      } else if (residueAmount > 0 && !hasFather) {
        shares.push({
          label: `Baitulmal / Waris Asabah Lain`,
          fraction: residueFraction,
          amount: residueAmount,
          color: 'bg-slate-200 text-slate-800 border-slate-300',
        });
      }
    }

    return { shares, hasNoSon: sonsCount === 0 };
  };

  const faraidResult = calculateFaraid();

  // --- FUNGSI HANTAR WHATSAPP ---
  const handleWhatsAppShare = () => {
    let message = `*RINGKASAN ANALISIS TAKAFUL*\n\n`;

    if (activeTab === 'income') {
      message += `🛡️ *PERLINDUNGAN PENDAPATAN*\n` +
        `• Total Hutang: RM ${numDebt.toLocaleString()}\n` +
        `• Sara Hidup: RM ${numExpense.toLocaleString()}/bln (${years} Thn @ ${numInflation}% Inflasi)\n` +
        `  └ Jumlah Sara Hidup: RM ${Math.round(totalLivingExpense).toLocaleString()}\n` +
        `• Dana Pendidikan: RM ${numEducation.toLocaleString()}\n` +
        `• Aset Sedia Ada (-): RM ${numAssets.toLocaleString()}\n\n` +
        `👉 *JUMLAH PERLINDUNGAN DIPERLUKAN:* RM ${Math.round(totalProtectionNeeded).toLocaleString()}\n`;
    } else if (activeTab === 'tax') {
      message += `💰 *PENJIMATAN CUKAI LHDN*\n` +
        `• Anggaran Pulangan Cukai: RM ${taxSavings}/tahun\n` +
        `• Caruman Takaful Bulanan: RM ${monthlyTakaful.toFixed(0)}/bulan\n` +
        `👉 *KOS SEBENAR SELEPAS REBAT CUKAI:* ~RM ${realMonthlyCost}/bulan sahaja!\n`;
    } else {
      message += `⚖️ *PEMBAHAGIAN FARAID & HIBAH*\n` +
        `• Nilaian Harta: RM ${Number(totalEstate).toLocaleString()}\n` +
        `• Pecahan Faraid Ringkasan:\n`;
      
      faraidResult.shares.forEach((s) => {
        message += `  - ${s.label}: RM ${Math.round(s.amount).toLocaleString()} (${(s.fraction * 100).toFixed(1)}%)\n`;
      });

      if (faraidResult.hasNoSon) {
        message += `\n⚠️ *NOTA SHOCK:* Tiada anak lelaki. Sebahagian harta dialirkan keluar kepada adik-beradik/bapa saudara.\n`;
      }
      message += `\n💡 *Penyelesaian:* Hibah Takaful memberikan 100% tunai terus kepada penama pilihan tanpa melalui pembekuan akaun probat.\n`;
    }

    message += `\nSila hubungi saya untuk penerangan lanjut!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-800 pb-10 font-sans flex flex-col justify-between">
      <div>
        {/* Header Utama */}
        <header className="bg-emerald-700 text-white p-4 shadow-md rounded-b-xl">
          <h1 className="text-base font-bold flex items-center gap-2">
            <Calculator className="w-5 h-5" /> Takaful Pocket Kit
          </h1>
          <p className="text-xs text-emerald-100 mt-0.5">Pendekatan Pantas Direct Approach</p>
        </header>

        {/* Tab Navigasi 3-Dalam-1 */}
        <div className="flex border-b bg-white text-xs font-semibold shadow-sm">
          <button
            onClick={() => setActiveTab('income')}
            className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1 ${
              activeTab === 'income' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-500'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Pendapatan
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1 ${
              activeTab === 'tax' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-500'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" /> Rebat Cukai
          </button>
          <button
            onClick={() => setActiveTab('faraid')}
            className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1 ${
              activeTab === 'faraid' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-transparent text-slate-500'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" /> Faraid/Hibah
          </button>
        </div>

        {/* Kandungan Mengikut Tab */}
        <main className="p-4 space-y-4">

          {/* TAB 1: PERLINDUNGAN PENDAPATAN */}
          {activeTab === 'income' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                <h2 className="text-sm font-bold text-slate-800 border-b pb-2">
                  Kalkulator Perlindungan Pendapatan
                </h2>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Total Hutang (Debt)</label>
                  <input
                    type="number"
                    placeholder="RM"
                    value={debt}
                    onChange={(e) => setDebt(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="border border-slate-300 rounded-xl p-3.5 space-y-3 bg-slate-50/50">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Sara Hidup Bulanan (Monthly Expense)</label>
                    <input
                      type="number"
                      placeholder="Contoh: 2000"
                      value={monthlyExpense}
                      onChange={(e) => setMonthlyExpense(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 bg-white rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-600">Tempoh Kelangsungan Hidup:</span>
                      <span className="font-bold text-emerald-700 text-sm">{years} Tahun</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Kadar Inflasi Tahunan (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      className="w-full p-2 border border-slate-300 bg-white rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-lg">
                    <p className="text-xs font-medium text-emerald-800">Total Sara Hidup ({years} Tahun @ {numInflation}% Inflasi):</p>
                    <p className="text-lg font-extrabold text-emerald-700 mt-0.5">RM {Math.round(totalLivingExpense).toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Pendidikan (Education)</label>
                  <input
                    type="number"
                    placeholder="RM"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Aset Sedia Ada (-)</label>
                  <input
                    type="number"
                    placeholder="RM"
                    value={existingAssets}
                    onChange={(e) => setExistingAssets(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-emerald-700 text-white p-4 rounded-xl shadow-md text-center space-y-1">
                <p className="text-xs font-medium text-emerald-100">Jumlah Keperluan Perlindungan Pendapatan</p>
                <p className="text-2xl font-black">RM {Math.round(totalProtectionNeeded).toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* TAB 2: PELEPASAN CUKAI LHDN */}
          {activeTab === 'tax' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b pb-2">Kalkulator Penjimatan Cukai LHDN</h2>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Anggaran Pendapatan Tahunan (RM)</label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Kadar Skala Cukai (%)</label>
                <select
                  value={taxBracket}
                  onChange={(e) => setTaxBracket(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value={8}>8% (Pendapatan RM 35k - 50k)</option>
                  <option value={13}>13% (Pendapatan RM 50k - 70k)</option>
                  <option value={21}>21% (Pendapatan RM 70k - 100k)</option>
                  <option value={24}>24% (Pendapatan RM 100k+)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Cadangan Caruman Takaful Tahunan (RM)</label>
                <input
                  type="number"
                  value={takafulContribution}
                  onChange={(e) => setTakafulContribution(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-1">
                <p className="text-xs font-semibold text-emerald-800">Duit Pulangan Cukai (Tax Refund) Anda</p>
                <p className="text-3xl font-black text-emerald-600">RM {taxSavings}</p>
                <div className="mt-2 pt-2 border-t border-emerald-200 text-xs text-emerald-900">
                  Kos Sebenar Takaful: <span className="font-extrabold underline">RM {realMonthlyCost}/bulan</span> sahaja!
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KALKULATOR FARAID TERPERINCI */}
          {activeTab === 'faraid' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                <h2 className="text-sm font-bold text-slate-800 border-b pb-2 flex items-center justify-between">
                  <span>Kalkulator Simulasi Faraid</span>
                  <Users className="w-4 h-4 text-emerald-600" />
                </h2>

                {/* 1. Nilaian Harta */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Jumlah Nilaian Harta / Tunai (RM)</label>
                  <input
                    type="number"
                    value={totalEstate}
                    onChange={(e) => setTotalEstate(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* 2. Tanggungan / Pasangan */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Pasangan Meninggal / Ada</label>
                  <select
                    value={spouseType}
                    onChange={(e) => setSpouseType(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white"
                  >
                    <option value="wife">Meninggalkan Isteri</option>
                    <option value="husband">Meninggalkan Suami</option>
                    <option value="none">Bujang / Tiada Pasangan</option>
                  </select>
                </div>

                {/* 3. Ibu Bapa */}
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <label className="flex items-center gap-2 p-2.5 border rounded-lg bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFather}
                      onChange={(e) => setHasFather(e.target.checked)}
                      className="accent-emerald-600"
                    />
                    <span>Ada Bapa</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 border rounded-lg bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasMother}
                      onChange={(e) => setHasMother(e.target.checked)}
                      className="accent-emerald-600"
                    />
                    <span>Ada Ibu</span>
                  </label>
                </div>

                {/* 4. Anak-anak */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Bil. Anak Lelaki</label>
                    <input
                      type="number"
                      min="0"
                      value={sonsCount}
                      onChange={(e) => setSonsCount(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Bil. Anak Perempuan</label>
                    <input
                      type="number"
                      min="0"
                      value={daughtersCount}
                      onChange={(e) => setDaughtersCount(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* 5. Adik-Beradik */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600 block">Adik-Beradik Lelaki</label>
                    <input
                      type="number"
                      min="0"
                      value={brothersCount}
                      onChange={(e) => setBrothersCount(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600 block">Adik-Beradik Perempuan</label>
                    <input
                      type="number"
                      min="0"
                      value={sistersCount}
                      onChange={(e) => setSistersCount(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* KEPUTUSAN CARTA PECAHAN FARAID */}
              <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Anggaran Pembahagian Faraid
                </h3>

                <div className="space-y-2">
                  {faraidResult.shares.map((share, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex justify-between items-center text-xs ${share.color}`}>
                      <div>
                        <p className="font-bold">{share.label}</p>
                        <p className="text-[10px] opacity-80">{(share.fraction * 100).toFixed(1)}% daripada keseluruhan harta</p>
                      </div>
                      <p className="font-black text-sm">RM {Math.round(share.amount).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Shock Alert Box jika Tiada Anak Lelaki */}
                {faraidResult.hasNoSon && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg space-y-1 mt-3">
                    <div className="flex items-center gap-1.5 text-red-800 font-bold text-xs">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      WARIS BAKI (ASABAH) TERTANGGUNG
                    </div>
                    <p className="text-[11px] text-red-700 leading-relaxed">
                      Oleh kerana <strong>tiada anak lelaki</strong>, sebahagian harta secara automatik teragih keluar kepada adik-beradik / bapa saudara.
                    </p>
                  </div>
                )}

                {/* Penyelesaian Hibah Takaful */}
                <div className="bg-emerald-800 text-white p-3.5 rounded-xl space-y-1 text-xs">
                  <p className="font-bold text-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Solusi Hibah Takaful
                  </p>
                  <p className="text-[11px] text-emerald-100 leading-relaxed">
                    Sediakan nilai **Hibah Takaful** terus kepada isteri/anak. Duit pampasan **100% milik penama serta-merta dalam 14 hari** tanpa perlu dibahagikan mengikut kadar Faraid di atas.
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Butang Utama WhatsApp */}
      <div className="p-4 bg-white border-t border-slate-200 sticky bottom-0">
        <button
          onClick={handleWhatsAppShare}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
        >
          <Send className="w-4 h-4" /> Hantar Ringkasan ke WhatsApp
        </button>
      </div>
    </div>
  );
}