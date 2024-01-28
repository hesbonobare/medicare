import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-[100%] h-[50vh]">
         <HashLoader

    color={"#0067FF"}
    size={30}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  </div>
  )
}

export default Loading