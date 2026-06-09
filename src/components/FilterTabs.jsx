const TABS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행 중' },
  { key: 'done', label: '완료' },
];

export default function FilterTabs({ filter, onFilter, todos }) {
  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  return (
    <div className="flex gap-2 mb-5">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilter(key)}
          className={[
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold transition-colors border',
            filter === key
              ? 'bg-green-600 text-white border-green-600 shadow'
              : 'bg-white text-gray-500 border-gray-200 hover:border-green-400 hover:text-green-600',
          ].join(' ')}
        >
          {label}
          <span
            className={[
              'text-xs font-black px-1.5 py-0.5 rounded-full',
              filter === key ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500',
            ].join(' ')}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
