import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from './documentation/swagger.json' assert { type: 'json' };
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./config/logging.js";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import officialRoutes from "./routes/officialRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import transferRoute from "./routes/transferRoutes.js";
import TournamentRoutes from "./routes/tournamentRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin:process.env.FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', , 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
  credentials: true,
};
console.log(FRONTEND_URL)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions));              
app.use(cookieParser());                  
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/admin", superAdminRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/transfer", transferRoute);
app.use("/api/manager", managerRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/officials", officialRoutes);
app.use("/api/tournament", TournamentRoutes);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await connectDB(); 
    logger.log("info", `Application running on port ${port}`);
  } catch (error) {
    logger.log("error", `Failed to connect to the database: ${error.message}`);
  }
});
