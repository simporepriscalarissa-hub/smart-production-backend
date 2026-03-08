import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OuvriersModule } from './ouvriers/ouvriers.module';
import { ProductionModule } from './production/production.module';
import { QualiteModule } from './qualite/qualite.module';
import { AuthModule } from './auth/auth.module';
import { OeeModule } from './oee/oee.module';
import { DepartementsModule } from './departements/departements.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'smart_production',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    OuvriersModule,
    ProductionModule,
    QualiteModule,
    AuthModule,
    OeeModule,
    DepartementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
