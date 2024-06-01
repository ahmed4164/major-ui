import { useState } from "react";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    console.log('@@showloader', isLoading)
    setIsLoading(true);
};

const dismissLoader = () => {
      console.log('@@dismissLoader', isLoading)
      setIsLoading(false);
    };
    
    
    console.log('@@@@@@@@isLoading', isLoading)
  return { isLoading, showLoader, dismissLoader };
};

export default useLoader;
