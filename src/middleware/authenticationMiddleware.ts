import {Request, Response, NextFunction} from 'express'
import axios from 'axios'
import * as https from 'https'

interface Model {
    Token: string;
}

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer", "").trim();
  const AUTH_API_URL = process.env.AUTH_API_URL || "http://localhost:3000";

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const model: Model = { Token: token };
  try {
    const response = await axios.post(
      `${AUTH_API_URL}api/auth/validatetoken`,
      model,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.valid) {
      next();
    } else {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error validating token",
    });
  }
}; 

export default authenticationMiddleware