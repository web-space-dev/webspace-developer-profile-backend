/**
 * Sort data for a successful response
 *
 * @param data
 */
export const handleSuccess = (data: any) => {
  return {
    sucess: true,
    data,
  };
};

/**
 * Sort data for a error response
 *
 * @param error
 */
export const handleError = (error: any) => {
  const errorString =
    typeof error !== "string" ? getErrorMessage(error) : error;

  return {
    sucess: false,
    error: errorString,
  };
};

const getErrorMessage = (err: any) => {
  let message;
  switch (err.code) {
    case 11000:
    case 11001:
      message = getUniqueErrorMessage(err);
      break;
    default:
      message = "Something went wrong";
  }
  return message;
};

/**
 * Get unique error field name
 */
const getUniqueErrorMessage = (err: any) => {
  let output;

  try {
    const obj = err.keyValue;
    const arr = Object.entries(obj);

    const msg = `${arr.map((dat) => dat)} already exists`;

    output = msg.replace(",", " ");
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};
