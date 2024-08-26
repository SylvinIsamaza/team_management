import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from './documentation/swagger.json' assert { type: 'json' };
import cors from "cors"
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./config/logging.js"
import connectDB from "./config/db.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import officialRoutes from "./routes/officialRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"
import AuthRoutes from "./routes/authRoutes.js"
import TournamentRoutes from "./routes/tournamentRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", 
  methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"  ],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  credentials:true,

  
};
app.use(cors(
 corsOptions
))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/admin", superAdminRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/auth", AuthRoutes)
app.use("/api/officials",officialRoutes)
app.use("/api/tournament",TournamentRoutes)
app.use(errorHandler)
const port = process.env.PORT || 5000;
app.listen(port, async() => {
  
   logger.log("info",`Application running on port ${port}`)
  await connectDB()
  
});
  