import { NextFunction, Response } from 'express';
import { IUser } from '../model/user.js';
import { JwtPayload } from 'jsonwebtoken';
export interface AuthenticatedRequest extends JwtPayload {
    user?: IUser | null;
}
export declare const isAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isAuth.d.ts.map