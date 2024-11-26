import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateNumberMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let { number } = req.body ?? req.query;

    if (typeof number === 'string' && !isNaN(Number(number))) {
      number = Number(number);
    }

    if (typeof number !== 'number' || Math.sign(number) !== 1 || !Number.isInteger(number)) {
      return res.status(400).json({ message: `Invalid number: ${number}` });
    }

    req.body.number = number;
    next();
  }
}
