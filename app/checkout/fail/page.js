const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-700 mb-6">
          Unfortunately, your payment was not successful. Please review your
          payment details and try again. If you continue to encounter issues,
          please contact customer support for assistance.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500">
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default Cancel;
