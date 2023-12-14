import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user_id, setUser_id] = useState(null);
    return (
        <UserContext.Provider value={{ user_id, setUser_id }}>
          {children}
        </UserContext.Provider>
      );
}

export const useUser = () => {
    return useContext(UserContext);
  };