
export async function userMatchMiddleWare(req, res, next) {
  const { id } = req.params;
  try {
    if (id == req.user._id) {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized to perform transaction",
      });
    }
  } catch (error) {
    next(error);
  }
}
