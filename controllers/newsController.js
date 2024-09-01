import News from "../models/news.js"
export const getAllNews = async (req, res, next) => {
  try {
      const news = await News.find().select("-__v  -createdAt -updatedAt");
      res.json({success:true,news});
  } catch (error) {
      next(error);
  }
};
export const createNews = async (req, res, next) => {
  try {

    const file = req.file;
    console.log(req.body)
    console.log(file)
  const fileName =file? file.filename:"";
    const news = new News(req.body);
    news.coverImage = fileName;
    
    
    await news.save();
      res.json({success:true,news});
  } catch (error) {
      next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  const id=req.params.id
  try {
  
    const news = await News.findById(id).select("-__v  -createdAt -updatedAt");
    if (!news) {
      return res.status(404).json({ success: false, message: "News not found" })
    }
      res.json({success:true,news:news});
  } catch (error) {
      next(error);
  }
};


export const updateNewsById = async (req, res, next) => {
  const id=req.params.id
  try {
    const news = await News.findByIdAndUpdate(id, req.body);
    const updatedNews=await News.findById(id).select("-__v  -createdAt -updatedAt")
      res.json({success:true,news:updatedNews});
  } catch (error) {
      next(error);
  }
};

export const deleteNewsById = async (req, res, next) => {
  const id=req.params.id
  try {
    await News.findOneAndDelete(id)
    res.json({ success: true, message: "Successfully deleted news" });
  } catch (error) {
      next(error);
  }
};