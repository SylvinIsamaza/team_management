import User from '../models/user.js';
import Team from "../models/team.js"
export const getAllManagers = async (req, res, next) => {
  try {
      const managers = await User.find({ role: "manager" }).select("-__v -resetPasswordLink -createdAt -updatedAt");

      const allManagers = await Promise.all(
          managers.map(async (manager) => {
             
              const team = await Team.findById(manager.teamID).select("-__v -officials -createdAt -updatedAt -paymentReceipt");
              
              return {
                  ...manager._doc, 
                  team,            
              };
          })
      );

      
      res.json({success:true,managers:allManagers});
  } catch (error) {
      next(error);
  }
};

export const getManagerById = async (req, res, next) => {
  const id=req.params.id
  try {
      const manager = await User.findById(id).select("-__v -resetPasswordLink -createdAt -updatedAt");

    const managerTeam = await Team.findById(manager.teamID)
    manager.team=managerTeam

      
      res.json({success:true,manager:manager});
  } catch (error) {
      next(error);
  }
};


export const updateManagerById = async (req, res, next) => {
  const id=req.params.id
  try {
      const manager = await User.findByIdAndUpdate(id,req.body).select("-__v -resetPasswordLink -createdAt -updatedAt");

    const managerTeam = await Team.findById(manager.teamID)
    manager.team=managerTeam

      
      res.json({success:true,manager:manager});
  } catch (error) {
      next(error);
  }
};

export const deleteManagerById = async (req, res, next) => {
  const id=req.params.id
  try {
    await User.findOneAndDelete(id)
    res.json({ success: true, message: "Successfully deleted manager" });
  } catch (error) {
      next(error);
  }
};