import { UpdateUserDto } from './update.user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { PasswordHashing } from '../../common/helpers/password-hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    user.password = await PasswordHashing.hashPassword(user.password);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.usersRepository.findOne(id);
    if (!existUser) {
      throw new BadRequestException(`There is no user identify by ${id}`);
    }

    Object.assign(existUser, updateUserDto);
    console.log(existUser);
    return this.usersRepository.save(existUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .getMany();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
