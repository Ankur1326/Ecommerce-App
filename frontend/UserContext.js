import React, { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userIdFromToken, setUserIdFromToken] = useState("");

  return (
    <UserType.Provider value={[userIdFromToken, setUserIdFromToken]}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
