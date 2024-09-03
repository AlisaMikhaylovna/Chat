import { PrismaClient } from '@prisma/client';

// 声明一个全局变量 prisma，类型是 PrismaClient 或 undefined
declare global {
    var prisma: PrismaClient | undefined;
}

// 使用 `prisma` 在应用程序中读取和写入数据库数据
export const db = globalThis.prisma || new PrismaClient();

// 如果当前环境不是生产环境，将 db 实例保存到全局变量中
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

