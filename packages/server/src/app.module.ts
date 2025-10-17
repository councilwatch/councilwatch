import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigModule } from "./app-config/app-config.module";
import { AppConfigService } from "./app-config/app-config.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService) => ({
        type: "postgres",
        applicationName: "CouncilWatch",
        url: configService.get("DATABASE_URL"),
        synchronize: false,
        autoLoadEntities: true,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        migrations: [join(__dirname, "common", "migrations", "*.{ts,js}")],
        migrationsRun: true,
      }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
