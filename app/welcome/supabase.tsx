import { useEffect, useState, type FormEvent } from 'react';
import { useSupabase } from '~/lib/useSupabase';

type Todo = {
  id: string;
  task: string;
  is_complete: boolean;
  inserted_at: string | null;
};

type TodoRow = {
  id: string | number;
  task: string | null;
  is_complete: boolean | null;
  inserted_at: string | null;
};

const normalizeTodo = (row: TodoRow): Todo => ({
  id: String(row.id),
  task: row.task ?? '',
  is_complete: Boolean(row.is_complete),
  inserted_at: row.inserted_at,
});

export function SupabaseTodoDemo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set<string>());
  const supabase = useSupabase();

  useEffect(() => {
    if (!supabase) {
      setError(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
      );
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
      setLoading(true);

      // Retry until Supabase returns a successful response.
      // Adds a short delay between attempts to avoid tight looping on errors.
      for (;;) {
        const {
          data,
          error: fetchError,
          status,
        } = await supabase
          .from('todos')
          .select('id, task, is_complete, inserted_at')
          .order('inserted_at', { ascending: false })
          .limit(25);

        if (!fetchError && status === 200 && (data ?? []).length > 0) {
          const rows = (data ?? []) as TodoRow[];
          setTodos(rows.map(normalizeTodo));
          setError(null);
          setLoading(false);
          return;
        }

        const message =
          fetchError?.message ??
          (status && status !== 200
            ? `Unexpected status: ${status}`
            : 'Unknown fetch error');
        setError(message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    fetchTodos();
  }, [supabase]);

  const setPending = (id: string, value: boolean) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task = newTask.trim();

    if (!task || submitting) {
      return;
    }

    if (!supabase) {
      setError('Supabase client is unavailable.');
      return;
    }

    setSubmitting(true);

    const { data, error: insertError } = await supabase
      .from('todos')
      .insert({ task })
      .select('id, task, is_complete, inserted_at')
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      const todo = normalizeTodo(data as TodoRow);
      setTodos((prev) => [todo, ...prev]);
      setNewTask('');
      setError(null);
    }

    setSubmitting(false);
  };

  const toggleTodo = async (todo: Todo) => {
    if (!supabase) {
      setError('Supabase client is unavailable.');
      return;
    }

    setPending(todo.id, true);

    const { data, error: updateError } = await supabase
      .from('todos')
      .update({ is_complete: !todo.is_complete })
      .eq('id', todo.id)
      .select('id, task, is_complete, inserted_at')
      .single();

    if (updateError) {
      setError(updateError.message);
    } else if (data) {
      const updated = normalizeTodo(data as TodoRow);
      setTodos((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      setError(null);
    }

    setPending(todo.id, false);
  };

  const deleteTodo = async (id: string) => {
    if (!supabase) {
      setError('Supabase client is unavailable.');
      return;
    }

    setPending(id, true);

    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      setPending(id, false);
      return;
    }

    setTodos((prev) => prev.filter((item) => item.id !== id));
    setPending(id, false);
    setError(null);
  };

  const hasTodos = todos.length > 0;

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTodo} className="flex flex-wrap gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a todo"
          className="flex-1 min-w-0 rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || newTask.trim() === ''}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-zinc-600">
          Loading todos… Supabase is warming up, first load may take a moment!
        </p>
      ) : hasTodos ? (
        <ul className="space-y-2">
          {todos.map((todo) => {
            const pending = pendingIds.has(todo.id);

            return (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(todo)}
                  disabled={pending}
                  className="flex items-center gap-2 text-left"
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                      todo.is_complete
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-zinc-300'
                    }`}
                    aria-hidden="true"
                  >
                    {todo.is_complete ? '✓' : ''}
                  </span>
                  <span
                    className={
                      todo.is_complete
                        ? 'text-zinc-400 line-through'
                        : 'text-zinc-800'
                    }
                  >
                    {todo.task}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  disabled={pending}
                  className="text-xs font-medium text-zinc-500 transition hover:text-rose-600 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-zinc-600">
          No todos yet. Add your first task!
        </p>
      )}
    </div>
  );
}
