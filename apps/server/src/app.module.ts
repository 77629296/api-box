import { HttpException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { ZodValidationPipe } from 'nestjs-zod';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';
import { StorageModule } from './storage/storage.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    // Core Modules
    ConfigModule,
    DatabaseModule,
    MailModule,
    RavenModule,
    CacheModule,
    UtilsModule,
    HealthModule,

    // Feature Modules
    AuthModule.register(),
    UserModule,
    StorageModule,

    // Static Assets
    ServeStaticModule.forRoot({
      serveRoot: '/artboard',
      rootPath: join(__dirname, '..', 'artboard'),
    }),
    ServeStaticModule.forRoot({
      renderPath: '/*',
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          // Filter all HttpException with status code <= 500
          {
            type: HttpException,
            filter: (exception: HttpException) => exception.getStatus() < 500,
          },
        ],
      }),
    },
  ],
})
export class AppModule {}
