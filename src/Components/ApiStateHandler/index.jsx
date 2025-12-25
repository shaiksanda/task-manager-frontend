import { RingLoader } from "react-spinners"
const ApiStateHandler = ({ isLoading, isFetching, isError, error, data, children }) => {
  if (isLoading || isFetching) {
    return (
      <div className="flex-layout">
        <h1 className="flex-layout-error">
          Please wait while we fetch data from the server
        </h1>
        <RingLoader color="red" size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-layout">
        <img
          className="flex-layout-image"
          src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1765946826/error_wrnn2h.webp"
          alt=""
        />
        <h1 className="flex-layout-error">
          {error?.data?.message || "Something went wrong"}
        </h1>
      </div>
    );
  }

  const isEmpty =
    data === null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0);


  if (isEmpty) {
    return <div className="flex-layout">
      <img
        src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1754304003/Screenshot_2025-08-04_160928_tkliwk.webp"
        alt="no data"
      />
      <h1 className="error">No Data Found</h1>
    </div>
  }

  return children;
};

export default ApiStateHandler;
