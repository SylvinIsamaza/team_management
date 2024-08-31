import OfficialUpdate from "../models/officialUpdate.js"

export const getAllOfficialUpdate = async (req, res, next) => {
  try {
      const officialUpdate = await OfficialUpdate.find().select("-__v  -createdAt -updatedAt");
      res.json({success:true,officialUpdate});
  } catch (error) {
      next(error);
  }
};
export const createOfficialUpdate = async (req, res, next) => {
  try {
    console.log(req.body)
    const officialUpdate = new OfficialUpdate(req.body)
    await officialUpdate.save();
      res.json({success:true,officialUpdate});
  } catch (error) {
      next(error);
  }
};

export const getOfficialUpdateById = async (req, res, next) => {
  const id=req.params.id
  try {
      const officialUpdate = await OfficialUpdate.findById(id).select("-__v  -createdAt -updatedAt");
      res.json({success:true,officialUpdate:officialUpdate});
  } catch (error) {
      next(error);
  }
};


export const updateOfficialUpdateById = async (req, res, next) => {
  const id=req.params.id
  try {
      const officialUpdate = await OfficialUpdate.findByIdAndUpdate(id,req.body).select("-__v  -createdAt -updatedAt");
      res.json({success:true,officialUpdate:officialUpdate});
  } catch (error) {
      next(error);
  }
};

export const deleteOfficialUpdateById = async (req, res, next) => {
  const id=req.params.id
  try {
    await OfficialUpdate.findOneAndDelete(id)
    res.json({ success: true, message: "Successfully deleted officialUpdate" });
  } catch (error) {
      next(error);
  }
};