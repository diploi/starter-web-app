import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Web App Starter Kit' },
    {
      name: 'description',
      content:
        'This is the React frontend for your app. Supabase is already connected and ready to use.',
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
