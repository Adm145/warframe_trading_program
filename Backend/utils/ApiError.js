const ApiError = (status, detail) => {
   const error = new Error(detail);
   error.isApiError = true;
   error.status = status;
   error.detail = detail;
   return error;
};

module.exports = { ApiError };