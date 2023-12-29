import { prisma } from '@/middleware/prisma';

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  let db = null;
  switch(query.table){
    case "user":
      db = await prisma.user.findMany();
        break;
    case "channel":
      db = await prisma.channel.findMany();
        break;
    case "video":
      db = await prisma.video.findMany();
      break;
    default:
      break;
  }
  return db;
});