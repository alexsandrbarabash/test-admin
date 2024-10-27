const { z } = require('zod');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = z.object({
  id: z
    .string()
    .refine((value) => ObjectId.isValid(value), {
      message: 'Invalid ObjectId',
    })
    .transform((value) => new ObjectId(value)),
});
