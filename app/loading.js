// components/Loading.js

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full bg-blue-500 w-6 h-6 mr-2"></div>
      <div className="animate-ping rounded-full bg-purple-500 w-4 h-4"></div>
    </div>
  );
};

export default Loading;
