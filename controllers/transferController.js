import Transfer from "../models/transfer.js"
export const getAllTransfer = async (req, res, next) => {
  try {
      const transfer = await Transfer.find().select("-__v  -createdAt -updatedAt");
      res.json({success:true,transfer});
  } catch (error) {
      next(error);
  }
};

export const newTransfer = async (req, res, next) => {
  try {
    const transfer = new Transfer(req.body);
    
    res.json({success:true,transfer});
} catch (error) {
    next(error);
}
}
export const getTransferById = async (req, res, next) => {
  const id=req.params.id
  try {
      const transfer = await Transfer.findById(id).select("-__v  -createdAt -updatedAt");
      res.json({success:true,transfer:transfer});
  } catch (error) {
      next(error);
  }
};


export const updateTransferById = async (req, res, next) => {
  const id=req.params.id
  try {
      const transfer = await Transfer.findByIdAndUpdate(id,req.body).select("-__v  -createdAt -updatedAt");
      res.json({success:true,transfer:transfer});
  } catch (error) {
      next(error);
  }
};

export const deleteTransferById = async (req, res, next) => {
  const id=req.params.id
  try {
    await Transfer.findOneAndDelete(id)
    res.json({ success: true, message: "Successfully deleted transfer" });
  } catch (error) {
      next(error);
  }
};