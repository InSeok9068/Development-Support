import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../', '.env.development') });
process.env.DATABASE_URL = 'file:../db/DEVELOPMENT-SUPPORT-TEST.db';

/*
실행 전 기존 테스트가 생성했던 데이터들 삭제
npx prisma migrate reset 고려
*/
