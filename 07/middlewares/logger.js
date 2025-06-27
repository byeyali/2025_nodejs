const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
}); // logger 설정

const logging = (req, res, next) => {
  const start = Date.now();

  // res.on의 두번째 함수는 요청이 끝났을때 호출되는
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.url} - ${req.statusCode} (${duration}ms)`);
  });

  next();
};

module.exports = {
  logger,
  logging,
};
