import express from "express";
import {config} from "dotenv"
import { connectDB } from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import hospitalRoutes from "./routes/hospitalRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import bedRoutes from "./routes/bedRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import patientRoutes from "./routes/patientRoutes.js"
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from "cors";
import http from 'http';
import { Server } from "socket.io";


config({
    path :"./.env",
});

connectDB();

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
export const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));
app.use(cookieParser());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));


app.get('/',(req,res)=>{
    res.send('api working');
});

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/bed',bedRoutes);
app.use('/api/v1/hospital',hospitalRoutes);
app.use('/api/v1/dashboard',statsRoutes);
app.use('/api/v1/inventory',inventoryRoutes);
app.use('/api/v1/patient',patientRoutes);
app.use('/api/v1/city',cityRoutes);
app.use('/api/v1/notification',notificationRoutes)



app.use(errorMiddleware);

io.on("connection", (socket) => {
    console.log("A user connected");

    // Join a room based on hospital ID
    socket.on("joinHospital", (hospitalId) => {
        socket.join(`hospital_${hospitalId}`);
        console.log(`Socket ${socket.id} joined hospital room ${hospitalId}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(port,()=>console.log(`server running on http://localhost:${port}`));