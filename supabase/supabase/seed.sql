-- This file can be used to seed data in your Supabase DB
-- See https://supabase.com/docs/guides/deployment/database-migrations for more information

insert into public.todos (task, is_complete)
values
	('Explore Supabase todo demo', false),
	('Add a new task from the UI', false),
	('Mark a task complete to test updates', true);

