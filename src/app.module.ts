import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configConstant } from './common/constant/config.constant';

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
        uri: config.get(configConstant.mongoose.url),
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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
