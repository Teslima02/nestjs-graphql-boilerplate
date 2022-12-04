import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configConstant } from './common/constant/config.constant';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheModule } from './common/resource/redis-cache/redis-cache.module';
import { REDIS_CACHE_OPTIONS } from './common/resource/redis-cache/redis.config';

interface appConfigResult {
  apolloServerConfig: {
    introspection?: boolean;
    playground?: boolean;
  };
}

const appConfig = (): appConfigResult => {
  if (process.env.NODE_ENV === 'test') {
    return { apolloServerConfig: {} };
  }
  return {
    apolloServerConfig: {
      introspection: true,
      playground: true,
    },
  };
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get(configConstant.database.dev),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => {
        return { req };
      },
      ...appConfig().apolloServerConfig,
    }),
    // if you run into issues with redis setup
    // check your typescript version
    // down grade from
    // "cache-manager": "^5.0.1",
    // "cache-manager-redis-store": "^3.0.1",
    // down grade to
    // "cache-manager": "^4.0.0",
    // "cache-manager-redis-store": "^2.0.0",
    CacheModule.register({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: redisStore,
      ...REDIS_CACHE_OPTIONS,
    }),
    RedisCacheModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
