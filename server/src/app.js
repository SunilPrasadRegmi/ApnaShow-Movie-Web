import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import showRoutes from './routes/movie.route.js';
import bookingRoutes from './routes/booking.route.js';
import adminRoutes from './routes/admin.route.js';

const app = express();

await connectDB();

const NODE_ENV = process.env.NODE_ENV 

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}else {
    app.use(morgan('combined'));
}

// Security middleware
app.use(helmet());
app.use(compression());

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    }
});

app.use('/api/', limiter);

///api/v1/
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', showRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/admin', adminRoutes);


app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app