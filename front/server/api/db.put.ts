import { prisma } from '@/middleware/prisma';

export default defineEventHandler(async (e) => {
  const query = getQuery(e);
  const body = await readBody(e);
  let output = null;
    console.log(body,query.table,query.target);
  if (!body) {
    const detailError = createError({
      statusCode: 400,
      statusMessage: 'No item provided',
      data: {},
    });
    sendError(e, detailError);
  }
  try {
    let temp = null;
    switch(query.table){
      case 'user':
        temp = await prisma.user.update({
          where: { id: Number(query.target) },
          data: body,
        });
        break;
      case 'channel':
        temp = await prisma.channel.update({
          where: { id: Number(query.target) },
          data: body,
        });
        break;
      case 'video':
        temp = await prisma.video.update({
          where: { id: Number(query.target) },
          data: body,
        });
        break;
      default:
        break;
    }
    output = temp;
  } catch (error) {
    console.log(error);
  }
  return output;
});