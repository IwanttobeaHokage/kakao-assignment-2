import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8 text-sm">할 일이 없어요.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
