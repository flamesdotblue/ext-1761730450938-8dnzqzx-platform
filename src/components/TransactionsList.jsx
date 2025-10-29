import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';

function format(amount) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function TransactionsList({ items, onDelete }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-white/90">Today's Transactions</h3>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">No entries yet for today</div>
      ) : (
        <ul className="space-y-2">
          {items.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-xl bg-neutral-900/60 p-3 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.type === 'income' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                  {t.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.category}</div>
                  <div className="text-xs text-white/50">{t.note || (t.type === 'income' ? 'Income' : 'Expense')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`text-sm font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>{t.type === 'income' ? '+' : '-'}{format(t.amount)}</div>
                <button aria-label="Delete" onClick={() => onDelete(t.id)} className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
