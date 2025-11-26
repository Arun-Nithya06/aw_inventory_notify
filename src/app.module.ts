import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { NotificationModule } from './modules/notification/notification.module';
import { StoreModule } from './modules/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Customer } from './common/entities/customer.entity';
import { Product } from './common/entities/product.entity';
import { ProductVariant } from './common/entities/variant.entity';
import { Shop } from './common/entities/shop.entity';
import { InventoryLevel } from './common/entities/inventory_level.entity';
import { InventoryWebhookLog } from './common/entities/webhook_log.entity';
import { Location } from './common/entities/location.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptor/logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    NotificationModule,
    StoreModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [
          Customer,
          Product,
          ProductVariant,
          InventoryWebhookLog,
          InventoryLevel,
          Location,
          Shop,
          ProductVariant,
        ],
        synchronize: configService.get<string>('IN_STAGE') !== 'prod',
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Customer,
      Product,
      ProductVariant,
      InventoryWebhookLog,
      InventoryLevel,
      Location,
      ProductVariant,
      Shop,
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
