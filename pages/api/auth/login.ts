import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from './auth';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Your authentication logic here, authenticate user
    const user = { id: 123, username: 'example_user' };

    // Generate JWT
    const token = generateToken(user);

    // Send JWT as response
    res.status(200).json({ token });
}
