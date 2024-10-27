const { z } = require('zod');

module.exports = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  color: z.string(),
  categories: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => (Array.isArray(val) ? val : [val])),
});
