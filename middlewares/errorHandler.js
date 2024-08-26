
const errorHandler = (err, req, res, next) => {
 console.log(err)
  if (err.name === "MongoServerError" && err.code === 11000) {
    const key = Object.keys(err.keyPattern)[0];
    const collectionMatch = err.message.match(/collection: (\S+)/);
    const collection = collectionMatch
      ? singularize(collectionMatch[1].split(".")[1])
      : "";
    res.status(409).json({
      success: false,
      message: `${capitalize(collection)} with ${key} ${
        err.keyValue[key]
      } already exists.`,
    });
    return;
  }

  let statusCode = err.status
    ? err.status
    : res.statusCode === 200
    ? 500
      : res.statusCode;
  

  if (err.type == "validation") {
    statusCode = 400;
  }
  res.status(statusCode);
 
  res.send({
    succes: false,
    message: err.message,
  });
};

function singularize(collectionName) {
  if (collectionName.endsWith("s")) {
    return collectionName.slice(0, -1);
  }
  return collectionName;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default errorHandler;
