import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const hashPassword: Prisma.Middleware = async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data.password) {
        const salt = await bcrypt.genSalt();
        params.args.data.password = await bcrypt.hash(params.args.data.password, salt);
      }
    }
  }
  return next(params);
};

export default hashPassword;
