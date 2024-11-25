import { ValidateNumberMiddleware } from './validate-number.middleware';
import { Request, Response, NextFunction } from 'express';

describe('ValidateNumberMiddleware', () => {
  let middleware: ValidateNumberMiddleware;

it('should return 400 status code when number is not provided in the request body', () => {
  const req = {
    body: {}
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  middleware.use(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: 'Invalid number' });
  expect(next).not.toHaveBeenCalled();
});

it('should return 400 status code when number is not a number', () => {
  const req = {
    body: {
      number: 'not a number'
    }
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;

  it('should return 400 status code when number is a negative integer', () => {
    const req = {
      body: { number: -5 }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
  
    middleware.use(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid number' });
    expect(next).not.toHaveBeenCalled();
  });


  it('should return 400 status code when number is zero', () => {
    const req = {
      body: { number: 0 }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
  
    middleware.use(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid number' });
    expect(next).not.toHaveBeenCalled();
});

it('should return 400 status code when number is a floating-point value', () => {
  const req = {
    body: { number: 5.5 }
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  middleware.use(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: 'Invalid number' });
  expect(next).not.toHaveBeenCalled();
});

it('should return 400 status code when number is a boolean value', () => {
  const req = {
    body: { number: true }
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  middleware.use(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ message: 'Invalid number' });
  expect(next).not.toHaveBeenCalled();
});
});
});