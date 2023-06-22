import { User } from '../types';

export const DisplayUsers = ({ users }: { users: User[] }) => (
  <>
    {users.map((user) => (
      <div
        key={user.id}
        className='flex items-center justify-between border-b-[1px] border-x-slate-100 p-2'
      >
        <p className='font-bold'>{user.username}</p>
        <div className='flex flex-col items-center'>
          <p className='font-semibold'>{user.totalpoints}</p>
          <div className='font-extralight'>
            <span className='text-green-500'>{user.totalwins} </span>-
            <span className='text-red-500'> {user.totallosses}</span>
          </div>
        </div>
      </div>
    ))}
  </>
);
