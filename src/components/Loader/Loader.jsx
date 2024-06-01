import React from "react";
// import { Spinner } from "@chakra-ui/react";
import useLoader from "./LoaderStates"; // Importing the useLoader hook
// import LottieAnimation from "../lottie-animation";
import { Spinner } from "flowbite-react";

const Loader = () => {
  const { showLoader, dismissLoader } = useLoader(); // Using the useLoader hook

  return (
    <>
      <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
      backdropFilter: 'blur(5px)', // Adjust the blur amount as needed
      zIndex: '9999', // Adjust as needed
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
     {/* <img src="/assets/imgs/Loader.gif" alt="Loading..." visibility={showLoader? "visible":"hidden"}/> */}
    {/* <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      visibility={showLoader? "visible":"hidden"}
    /> */}
    {showLoader && (
      <Spinner aria-label="Default status example" />
      // {/* // <LottieAnimation animationPath="/assets/loader.json" lottieWidth="10em" /> */}
    )} 
  </div>

    </>
  );
};

export default Loader;
