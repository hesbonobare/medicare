import HashLoader from "react-spinners/HashLoader";

const LoadingButton = () => {
  return (
    <div className="flex justify-center items-center w-[100%] ">
         <HashLoader

    color="white"
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  </div>
  )
}

export default LoadingButton;