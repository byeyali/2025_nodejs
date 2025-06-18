// npm i winston
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(), // 콘솔로 출력
    new winston.transports.File({
      filename: "app.log",
    }),
  ],
});

console.log("로그 레벨 : error > warn > info > debug > verbose");
logger.info("정보 - 일반적인 정보메시지 출력시 info 사용");
logger.error("에러가 발생시 쓰세요");
logger.warn("경고 != 주의가 필요한 메시지 일때만 쓰세요");
logger.debug("디버그 - 개발중에만 사용하세요");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

simpleLogger.info("타임스탬프가 포함된 로그");
