import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterTabs from './components/FilterTabs';
import WeeklyView from './components/WeeklyView';

export function toDateStr(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getMonday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return toDateStr(d);
}

const today = toDateStr(new Date());

function loadTodos() {
  try {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// 저장된 todos 기준으로 다음 id 결정
const initialTodos = loadTodos();
let nextId = initialTodos.length > 0 ? Math.max(...initialTodos.map((t) => t.id)) + 1 : 1;

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(today);
  const [weekStart, setWeekStart] = useState(
    () => localStorage.getItem('weekStart') || getMonday(today)
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('weekStart', weekStart);
  }, [weekStart]);

  const handleSelectDate = (dateStr) => {
    setSelectedDate(dateStr);
    setWeekStart(getMonday(dateStr));
  };

  const addTodo = () => {
    const text = input.trim();
    if (!text) {
      setErrorMsg('할 일을 입력해주세요.');
      return;
    }
    setErrorMsg('');
    setTodos([...todos, { id: nextId++, text, done: false, date: selectedDate }]);
    setInput('');
  };

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const editTodo = (id, newText) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));

  const prevWeek = () => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() - 7);
    setWeekStart(toDateStr(d));
  };

  const nextWeek = () => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() + 7);
    setWeekStart(toDateStr(d));
  };

  const dateTodos = todos.filter((t) => t.date === selectedDate);
  const filteredTodos = dateTodos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-black text-green-600 mb-6 tracking-tight">Todo</h1>

        <WeeklyView
          weekStart={weekStart}
          selectedDate={selectedDate}
          todos={todos}
          today={today}
          onSelectDate={handleSelectDate}
          onPrevWeek={prevWeek}
          onNextWeek={nextWeek}
        />

        <TodoInput
          value={input}
          onChange={(v) => { setInput(v); if (errorMsg) setErrorMsg(''); }}
          onAdd={addTodo}
          errorMsg={errorMsg}
        />

        <FilterTabs filter={filter} onFilter={setFilter} todos={dateTodos} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}
