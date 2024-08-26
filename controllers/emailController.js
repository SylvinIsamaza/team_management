import sendCustomEmail from "../utils/sendCustomEmail.js";

class EmailController{
  async sendEmail(req, res, next) {
    
    const { templateName, subject, email, data } = req.body
   
    try {
      await sendCustomEmail({
        data,
        toEmail:email,
        subject,
        templateName
    }
      
    );
      res.send({
        success: true,
        message:"Message successfully sent"
      })
   } catch (error) {
    next(error)
   }
    
  }
}

export default new EmailController()