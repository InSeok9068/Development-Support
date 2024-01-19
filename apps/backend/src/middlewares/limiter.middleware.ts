import { rateLimit } from 'express-rate-limit';

const limiterMiddleware = rateLimit({
  windowMs: 60 * 1000, // 1분
  limit: 100, // 100회
  handler(_req, res, _next, _option) {
    res.status(200).json({ errors: [{ message: 'API 요청 제한 잠시 후 다시 시도해주세요.' }] });
  },
});

export { limiterMiddleware };
