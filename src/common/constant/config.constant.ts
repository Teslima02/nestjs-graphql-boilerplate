export const configConstant = {
  environment: {
    development: 'NODE_ENV',
    staging: 'NODE_ENV',
    production: 'NODE_ENV',
  },
  database: {
    dev: 'MONGODB_LOCAL_URL',
    prod: 'MONGODB_LIVE',
  },
  jwt: {
    jwtSecret: 'JWT_KEY',
    expireIn: 'JWT_EXP',
  },
  redis: {
    redisHost: 'REDIS_HOST',
    redisPort: 'REDIS_PORT',
    redisPassword: 'REDIS_PASSWORD',
  },
};
