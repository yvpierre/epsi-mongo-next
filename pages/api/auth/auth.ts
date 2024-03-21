import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';
interface Payload {
    [key: string]: any;
}

function generateToken(payload: Payload): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token: string): Payload | null {
    try {
        return jwt.verify(token, secretKey) as Payload;
    } catch (err) {
        return null;
    }
}

export { generateToken, verifyToken };
