import { useEffect, useState } from 'react';
import { DisplayNoData } from './components/DisplayNoData';
import { DisplayUsers } from './components/DisplayUsers';
import { supabase } from './lib/supabase';
import { User } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase
          .from('users')
          .select()
          .gte('totalpoints', 100)
          .order('totalpoints', { ascending: false });

        setUsers(data as User[]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [users]);

  return (
    <main className='flex flex-col items-center justify-center gap-11 py-7'>
      <h1 className='font-extralarge bg-gradient-to-b from-green-400 via-green-600 to-green-800 bg-clip-text text-3xl font-bold text-transparent'>
        Leaderboard
      </h1>

      <div className='h-96 w-96'>
        {!users ? <DisplayNoData /> : <DisplayUsers users={users} />}
      </div>
    </main>
  );
}

export default App;
