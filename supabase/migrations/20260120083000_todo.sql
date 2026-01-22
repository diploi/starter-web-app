create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  task text not null,
  is_complete boolean not null default false,
  inserted_at timestamptz not null default timezone('utc', now())
);

alter table public.todos disable row level security;

create index if not exists todos_inserted_at_desc
  on public.todos (inserted_at desc);