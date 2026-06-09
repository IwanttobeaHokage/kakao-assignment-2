export default function TodoInput({ value, onChange, onAdd, errorMsg }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onAdd();
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요"
          className={[
            'flex-1 px-4 py-2.5 border rounded-xl outline-none transition-colors font-medium text-sm',
            errorMsg
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-200 focus:border-green-500',
          ].join(' ')}
        />
        <button
          onClick={onAdd}
          className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-sm"
        >
          추가
        </button>
      </div>
      {errorMsg && (
        <p className="mt-1.5 text-sm font-semibold text-red-500">⚠ {errorMsg}</p>
      )}
    </div>
  );
}
