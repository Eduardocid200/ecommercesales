

import { useState } from "react";

const useUserMenu = () => {
  const [userMenuCount, setUserMenuCount] = useState(0);

  const incrementUserMenuCount = () => {
    setUserMenuCount((prevCount) => prevCount + 1);
  };

 

  return {
    userMenuCount,
    incrementUserMenuCount,
  
  };
};

export default useUserMenu;
