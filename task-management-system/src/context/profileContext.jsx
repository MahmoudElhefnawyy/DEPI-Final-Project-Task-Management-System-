import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'Mahmoud Mohamed',
    email: 'mahmoudmohameddeveloper@gmail.com',
    image: null,
    preferences: {
      theme: 'light',
      defaultView: 'list',
      notifications: true,
      emailFrequency: 'instant'
    }
  });

  const updateProfile = (newData) => {
    setProfile(prev => ({
      ...prev,
      ...newData
    }));
  };

  const updateProfileImage = (imageUrl) => {
    setProfile(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};