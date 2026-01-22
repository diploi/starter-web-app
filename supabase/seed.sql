-- This file can be used to seed data in your Supabase DB
-- See https://supabase.com/docs/guides/deployment/database-migrations for more information

insert into public.todos (task, is_complete)
values
	('Explore Web App Starter Kit demo', true),
	('Edit the frontend and watch changes apply', false),
	('Mark a task complete to test Supabase connection', false),
	('Open diploi.yaml and explore the components', false),
	('Launch the next unicorn company', false);

