import { Request, Response, NextFunction } from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import axios from 'axios'

describe('Authenticaton Middleware', () =>{
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: Partial<NextFunction>;
    
    beforeEach(() =>{
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as Partial<Response>;
        mockNext = jest.fn();
    });

    test('Should call next when token is provided', async () =>{
        mockRequest.header = jest.fn().mockReturnValue('Bearer mockToken')

        jest.spyOn(axios, 'get').mockResolvedValue({
            data:{
                success: true
            }
        });

        await authenticationMiddleware(
          mockRequest as Request,
          mockResponse as Response,
          mockNext as NextFunction
        );

        expect(mockNext).toHaveBeenCalled();
    });

    test('Should return 401 when token is not provided', async () =>{
        mockRequest.header = jest.fn().mockReturnValue(undefined)

        await authenticationMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            mockNext as NextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Token not provided'
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});


