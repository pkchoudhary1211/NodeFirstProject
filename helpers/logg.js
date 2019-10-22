const winston = require('winston');
const {transports, createLogger, format} = require('winston');
module.exports.infoLog=(type,data)=>{
    const logger = winston.createLogger({
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        transports: [
          new winston.transports.File({ filename: 'logs/infodata.log' })
        ],
    });
    logger.log({
        level: 'info',
        message: [type =type,Data= data],
      });
}
module.exports.errorLog=(name,data)=>{
    const logger = winston.createLogger({
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        transports: [
          new winston.transports.File({ filename: 'logs/errordata.log' })
        ],
    });
    logger.log({
        level: 'error',
        message:[name,data],
      });
}