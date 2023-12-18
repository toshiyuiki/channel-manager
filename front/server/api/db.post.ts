import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (e) => {
  const prisma = new PrismaClient();
  const query = getQuery(e)
  const body = await readBody(e);
  let output = null;

  if (!body) {
    const detailError = createError({
      statusCode: 400,
      statusMessage: 'Please input value.',
      data: {},
    });
    sendError(e, detailError);
  }
  try {
    let temp = null;
    switch(query.table){
      case 'user':
        temp = await prisma.user.create({
          data: body,
        });
        break;
      case 'channel':
        temp = await prisma.channel.create({
          data: body,
        });
        break;
      case 'video':
        temp = await prisma.video.create({
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