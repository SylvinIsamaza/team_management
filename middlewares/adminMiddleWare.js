import { validateAuthToken } from "../utils/jwt.js";


export async function adminMiddleWare(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send({
        success: true,
        message: "Please login to continue",
      });
    const result = validateAuthToken(token);
    if (!result.valid)
      return res.status(401).send({ success: false, message: result.message });

    let user;
    // if (result.decoded.role == "admin") {
    //   user = await adminServices.getAdminByCustomFields({
    //     _id: result.decoded._id,
    //   });

      user != null ? (req.user = user) : (req.user = null);
      next();
    // } else {
    //   res.status(401).json({
    //     success: false,
    //     message: "You are not authorized to perform transaction",
    //   });
    // }
  } catch (error) {
    next(error);
  }
}
