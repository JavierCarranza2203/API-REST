import winston from 'winston';

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log' }),
        new winston.transports.Console()
    ]
});

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    logger.error({
        message: err || 'Error interno del servidor',
        status: err.status || 500,
        endpoint: err.service || req.originalUrl,
    });

    res.status(err.status || 500).json({
        message: 'Error interno del servidor'
    });
};

export const errorInit = (status, message, endpoint) => {
    const error = new Error(message);
    error.status = status;
    error.service = endpoint;

    return error;
};
