import { Wallet, PieChart, ArrowDownRight, ArrowUpRight, Calendar } from 'lucide-react';

function format(amount) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function SummaryCards({ totalsToday, totalsMonth }) {
  return (
    <section className="grid grid-cols-2 gap-3">
      <div className="col-span-2 rounded-xl bg-neutral-900/70 p-4 ring-1 ring-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-emerald-400" />
            <span className="text-xs text-white/70">Today's Balance</span>
          </div>
          <Calendar className="h-4 w-4 text-white/40" />
        </div>
        <div className="mt-2 text-2xl font-semibold">{format(totalsToday.balance)}</div>
        <div className="mt-2 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-emerald-400"><ArrowUpRight className="h-3.5 w-3.5" /> {format(totalsToday.income)}</div>
          <div className="flex items-center gap-1 text-rose-400"><ArrowDownRight className="h-3.5 w-3.5" /> {format(totalsToday.expense)}</div>
        </div>
      </div>

      <div className="rounded-xl bg-neutral-900/70 p-4 ring-1 ring-white/5">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <PieChart className="h-5 w-5 text-sky-400" />
          <span>Month Income</span>
        </div>
        <div className="mt-2 text-xl font-semibold">{format(totalsMonth.income)}</div>
      </div>

      <div className="rounded-xl bg-neutral-900/70 p-4 ring-1 ring-white/5">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <PieChart className="h-5 w-5 rotate-180 text-rose-400" />
          <span>Month Expense</span>
        </div>
        <div className="mt-2 text-xl font-semibold">{format(totalsMonth.expense)}</div>
      </div>
    </section>
  );
}
