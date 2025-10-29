import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

const categories = {
  income: ['Salary', 'Bonus', 'Refund', 'Other'],
  expense: ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'],
};

export default function DailyInput({ onAdd }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const amt = parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      setError('Enter a valid amount greater than 0');
      return;
    }
    if (!date) {
      setError('Select a date');
      return;
    }
    onAdd({ type, amount: Math.round(amt * 100) / 100, category, date, note: note.trim() });
    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/5 bg-neutral-900/60 p-4 backdrop-blur">
      <div className="mb-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => { setType('expense'); setCategory('Food'); }} className={`rounded-lg px-3 py-2 text-sm ${type === 'expense' ? 'bg-rose-500 text-white' : 'bg-neutral-800 text-white/80'}`}>Expense</button>
        <button type="button" onClick={() => { setType('income'); setCategory('Salary'); }} className={`rounded-lg px-3 py-2 text-sm ${type === 'income' ? 'bg-emerald-500 text-white' : 'bg-neutral-800 text-white/80'}`}>Income</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs text-white/70">Amount</label>
          <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="mt-1 w-full rounded-lg bg-neutral-800 px-3 py-2 text-white placeholder-white/30 outline-none ring-1 ring-inset ring-white/10 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-xs text-white/70">Type</label>
          <select value={type} onChange={(e) => { setType(e.target.value); setCategory(categories[e.target.value][0]); }} className="mt-1 w-full rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-inset ring-white/10 focus:ring-emerald-500">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/70">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-inset ring-white/10 focus:ring-emerald-500">
            {categories[type].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/70">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-inset ring-white/10 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-xs text-white/70">Note</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" className="mt-1 w-full rounded-lg bg-neutral-800 px-3 py-2 text-white placeholder-white/30 outline-none ring-1 ring-inset ring-white/10 focus:ring-emerald-500" />
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

      <div className="mt-4">
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm active:scale-[.99]">
          <Plus className="h-4 w-4" /> Add Entry
        </button>
      </div>
    </form>
  );
}
