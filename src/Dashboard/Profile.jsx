import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'Guest');
  const email = user?.email || 'Not provided';
  const photo = user?.photoURL || 'https://www.gravatar.com/avatar/?d=mp&s=120';

  if (!user) {
    return (
      <div className="p-6 rounded-lg bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm">
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">Not signed in</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-white/90 dark:bg-gradient-to-r dark:from-gray-900/80 dark:to-gray-800/60 text-gray-900 dark:text-gray-100 shadow-md flex items-center gap-4">
      <img
        src={photo}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-300 dark:ring-orange-400"
      />

      <div>
        <div className="text-xl font-semibold">{displayName}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{email}</div>
      </div>
    </div>
  );
};

export default Profile;
