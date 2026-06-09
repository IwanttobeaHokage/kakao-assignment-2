import { useState } from 'react';

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CalendarPicker({ selectedDate, today, onSelect, onClose }) {
  const init = new Date(selectedDate + 'T00:00:00');
  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startBlank = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  const cells = [
    ...Array(startBlank).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => {
      const day = i + 1;
      return `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
    }),
  ];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  return (
    <>
      {/* 바깥 클릭 시 닫기 오버레이 */}
      <div className="fixed inset-0 z-10" onClick={onClose} />

      <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 w-72">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 font-bold text-lg"
          >
            ‹
          </button>
          <span className="font-bold text-gray-800">
            {viewYear}년 {viewMonth + 1}월
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 font-bold text-lg"
          >
            ›
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs font-bold text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((dateStr, i) =>
            dateStr ? (
              <button
                key={dateStr}
                onClick={() => { onSelect(dateStr); onClose(); }}
                className={[
                  'mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors',
                  dateStr === selectedDate
                    ? 'bg-green-600 text-white'
                    : dateStr === today
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100',
                ].join(' ')}
              >
                {parseInt(dateStr.slice(8))}
              </button>
            ) : (
              <div key={`blank-${i}`} />
            )
          )}
        </div>

        {/* 오늘로 이동 */}
        <button
          onClick={() => { onSelect(today); onClose(); }}
          className="mt-4 w-full py-1.5 text-xs font-bold text-green-600 border border-green-200 rounded-full hover:bg-green-50 transition-colors"
        >
          오늘로 이동
        </button>
      </div>
    </>
  );
}
