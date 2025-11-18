import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  if (!expiresIn) {
    throw new Error("JWT_EXPIRES_IN is missing from environment variables");
  }

  const options: SignOptions = {
    expiresIn: expiresIn as string, 
  };

  return jwt.sign({ id }, secret, options);
};
