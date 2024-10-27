const z = require('zod');

exports.configSchema = z.object({
  port: z.coerce.number().default(3000),
  mongoUrl: z.string(),
  adminUser: z.string(),
  adminPassword: z.string(),
});
