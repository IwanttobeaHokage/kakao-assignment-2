import { useState, useRef, useEffect } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    else setEditValue(todo.text);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li className={[
      'flex items-center gap-3 px-4 py-3 border rounded-xl transition-colors',
      todo.done ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white',
    ].join(' ')}>
      {/* 체크박스 */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-green-600 cursor-pointer shrink-0"
      />

      {/* 텍스트 or 수정 입력창 */}
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          className="flex-1 px-2 py-0.5 border border-green-400 rounded-lg outline-none text-sm font-medium"
        />
      ) : (
        <span
          className={[
            'flex-1 text-sm font-semibold',
            todo.done ? 'line-through text-gray-400' : 'text-gray-800',
          ].join(' ')}
        >
          {todo.text}
        </span>
      )}

      {/* 액션 버튼 */}
      <div className="flex gap-1 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className="text-xs px-2.5 py-1 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
            >
              저장
            </button>
            <button
              onClick={cancelEdit}
              className="text-xs px-2.5 py-1 text-gray-400 rounded-full font-bold hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onToggle(todo.id)}
              className={[
                'text-xs px-2.5 py-1 rounded-full font-bold border transition-colors',
                todo.done
                  ? 'border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-600'
                  : 'border-green-200 text-green-600 hover:bg-green-600 hover:text-white',
              ].join(' ')}
            >
              {todo.done ? '되돌리기' : '완료'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs px-2.5 py-1 border border-gray-200 text-gray-500 rounded-full font-bold hover:border-green-300 hover:text-green-600 transition-colors"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-xs px-2.5 py-1 border border-gray-200 text-gray-400 rounded-full font-bold hover:border-red-300 hover:text-red-500 transition-colors"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}
