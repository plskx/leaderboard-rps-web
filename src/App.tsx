import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

interface User {
  id: string;
  totallosses: number;
  totalpoints: number;
  totalrounds: number;
  totalwins: number;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase
          .from("users")
          .select()
          .gte("totalpoints", 100)
          .order("totalpoints", { ascending: false });

        setUsers(data as User[]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [users]);

  return (
    <main className="flex flex-col items-center justify-center gap-11 py-7">
      <h1 className="font-extralarge bg-gradient-to-b from-green-400 via-green-600 to-green-800 bg-clip-text text-3xl font-bold text-transparent">
        Leaderboard
      </h1>
      <div className="h-96 w-96">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b-[1px] border-x-slate-100 p-2"
          >
            <p className="font-bold">{user.username}</p>
            <div className="flex flex-col items-center">
              <p className="font-semibold">{user.totalpoints}</p>
              <div className="font-extralight">
                <span className="text-green-500">{user.totalwins} </span>-
                <span className="text-red-500"> {user.totallosses}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
