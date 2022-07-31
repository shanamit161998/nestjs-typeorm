import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository, private jwtService: JwtService) {

    }

    async signup(credentials: AuthCredentialsDto) {
        return this.usersRepository.creatUser(credentials);
    }

    async signIn(credentials: AuthCredentialsDto): Promise<object> {
        const { username, password } = credentials
        const user = await this.usersRepository.findOne({ username })
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload:JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload)
            return { accessToken }
        } else {
            throw new UnauthorizedException(`Please check your login credentials.`)
        }
    }
}
