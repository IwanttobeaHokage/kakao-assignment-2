import { useState } from 'react';
import CalendarPicker from './CalendarPicker';

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function toDateStr(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function WeeklyView({
  weekStart, selectedDate, todos, today,
  onSelectDate, onPrevWeek, onNextWeek,
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() + i);
    return toDateStr(d);
  });

  const monthLabel = (() => {
    const d = new Date(weekStart + 'T00:00:00');
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
  })();

  return (
    <div className="mb-6">
      {/* 주간 네비게이션 */}
      <div className="flex items-center justify-between mb-3 relative">
        <button
          onClick={onPrevWeek}
          className="text-sm font-bold text-gray-400 hover:text-green-600 px-2 py-1 rounded-full hover:bg-green-50 transition-colors"
        >
          ‹ 이전
        </button>

        {/* 월 클릭 → 달력 팝업 */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar((v) => !v)}
            className="text-sm font-bold text-gray-700 hover:text-green-600 px-3 py-1 rounded-full hover:bg-green-50 transition-colors"
          >
            📅 {monthLabel}
          </button>
          {showCalendar && (
            <CalendarPicker
              selectedDate={selectedDate}
              today={today}
              onSelect={onSelectDate}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        <button
          onClick={onNextWeek}
          className="text-sm font-bold text-gray-400 hover:text-green-600 px-2 py-1 rounded-full hover:bg-green-50 transition-colors"
        >
          다음 ›
        </button>
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dateStr, i) => {
          const count = todos.filter((t) => t.date === dateStr).length;
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const dayNum = new Date(dateStr + 'T00:00:00').getDate();

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={[
                'flex flex-col items-center py-2 rounded-xl text-sm transition-colors',
                isSelected
                  ? 'bg-green-600 text-white'
                  : isToday
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:bg-gray-100',
              ].join(' ')}
            >
              <span className="text-xs font-bold mb-1">{DAY_LABELS[i]}</span>
              <span className="font-black text-base">{dayNum}</span>
              <span
                className={[
                  'text-xs mt-1 font-bold',
                  isSelected ? 'text-green-200' : 'text-gray-400',
                ].join(' ')}
              >
                {count > 0 ? count : '·'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
