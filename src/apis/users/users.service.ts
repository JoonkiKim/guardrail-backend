// users.service.ts

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  // IUsersServiceDelete,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from './interfaces/user-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
  findOneById({ id }: IUsersServiceFindOneById): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['pushSubscriptions'],
    });
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const {
      email,
      password,
      name,
      birthDate,
      termsAgreed,
      privacyAgreed,
      marketingAgreed,
      phone,
    } = createUserInput;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ ISO 문자열을 Date 객체로 변환
    const birthDateObj = new Date(birthDate);

    return this.usersRepository.save({
      email,
      password: hashedPassword,
      name,
      phone,
      birthDate: birthDateObj,
      termsAgreed,
      privacyAgreed,
      marketingAgreed,

      pushNotificationEnabled: marketingAgreed,
    });
  }

  async update({
    userId,
    updateUserInput,
  }: IUsersServiceUpdate): Promise<User> {
    const id = userId;
    const user = await this.findOneById({ id });

    const updateData: any = { ...user, ...updateUserInput };

    // password가 있을 때만 해싱
    if (updateUserInput.password) {
      const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
      updateData.password = hashedPassword;
    }

    const result = this.usersRepository.save(updateData);
    return result;
  }

  async delete({ userId }: IUsersServiceDelete): Promise<string> {
    const { affected } = await this.usersRepository.softDelete({ id: userId });

    if (!affected) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    return '유저 삭제에 성공했습니다.';
  }

  async findUsersByReminderHour(reminderHour: number): Promise<User[]> {
    return this.usersRepository.find({
      where: { reminderHour, pushNotificationEnabled: true },
    });
  }

  async updateReminderHour(
    userId: string,
    reminderHour: number,
  ): Promise<User> {
    const user = await this.findOneById({ id: userId });
    user.reminderHour = reminderHour;
    return this.usersRepository.save(user);
  }

  async updatePushNotification(
    userId: string,
    enabled: boolean,
  ): Promise<User> {
    const user = await this.findOneById({ id: userId });
    user.pushNotificationEnabled = enabled;
    return this.usersRepository.save(user);
  }
}
