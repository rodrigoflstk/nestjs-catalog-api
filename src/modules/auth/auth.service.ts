import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dtos/auth.credentials-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username Already Exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ acessToken: string }> {
    const { username, password } = authCredentialsDTO;

    const user = await this.usersRepository.findOne({ where: { username } });

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (user && passwordCompare) {
      const payload: JwtPayload = { username };
      const acessToken: string = await this.jwtService.sign(payload);
      return { acessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
