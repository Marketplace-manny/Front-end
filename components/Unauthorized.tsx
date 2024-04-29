const Unauthorized = () => {
  return (
    <div className=" flex h-full justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700">
          Sorry, you are not authorized to view this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
