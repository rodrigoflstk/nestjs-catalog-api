import { Module } from '@nestjs/common';
import { AuthService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './user/jwt/jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 36000,
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [UserController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
