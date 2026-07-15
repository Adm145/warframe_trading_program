const { ApiError } = require("./ApiError");

const UnauthorizedError = (detail = "Unauthorized user.") => ApiError(401, detail);
const ForbiddenError = (detail = "You do not have access to this resource.") => ApiError(403, detail);
const NotFoundError = (detail = "Resource not found.") => ApiError(404, detail);
const BadRequestError = (detail = "Invalid request.") => ApiError(400, detail);
const UpstreamError = (detail = "Upstream API request failed.") => ApiError(502, detail);
const InternalServerError = (detail = "Internal server error.") => ApiError(500, detail);

module.exports = {
   UnauthorizedError,
   ForbiddenError,
   NotFoundError,
   BadRequestError,
   UpstreamError,
   InternalServerError,
};
