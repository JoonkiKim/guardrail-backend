// users.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from 'src/commons/decorators/current-user.decorator';
import { IAuthUser } from 'src/commons/types/auth-user.type';
import { Public } from 'src/commons/decorators/public.decorator';
import { UpdateReminderHourInput } from './dto/update-reminder-hour.input';
import { UpdatePushNotificationInput } from './dto/update-push-notification.input';
import { PushNotificationService } from 'src/commons/push/push-notification.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
    private readonly pushNotificationService: PushNotificationService,
  ) {}
  @Query(() => User)
  fetchLoginUser(@CurrentUser() user: IAuthUser): Promise<User> {
    return this.usersService.findOneById({ id: user.id });
  }

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: IAuthUser,
  ): Promise<User> {
    if (user.id !== userId) {
      throw new UnauthorizedException('본인만 수정할 수 있습니다.');
    }
    return this.usersService.update({ userId, updateUserInput });
  }

  @Mutation(() => String)
  deleteUser(
    @Args('userId') userId: string,
    @CurrentUser() user: IAuthUser,
  ): Promise<string> {
    if (user.id !== userId) {
      throw new UnauthorizedException('본인만 탈퇴할 수 있습니다.');
    }
    return this.usersService.delete({ userId });
  }

  @Mutation(() => User)
  async updateReminderHour(
    @CurrentUser() user: IAuthUser,
    @Args('updateReminderHourInput')
    updateReminderHourInput: UpdateReminderHourInput,
  ): Promise<User> {
    if (
      updateReminderHourInput.reminderHour < 0 ||
      updateReminderHourInput.reminderHour > 23
    ) {
      throw new BadRequestException('선호시간은 0부터 23시 사이여야 합니다.');
    }
    return this.usersService.updateReminderHour(
      user.id,
      updateReminderHourInput.reminderHour,
    );
  }

  @Mutation(() => User)
  async updatePushNotification(
    @CurrentUser() user: IAuthUser,
    @Args('updatePushNotificationInput')
    updatePushNotificationInput: UpdatePushNotificationInput,
  ): Promise<User> {
    return this.usersService.updatePushNotification(
      user.id,
      updatePushNotificationInput.enabled,
    );
  }

  @Mutation(() => String)
  async sendTestPushNotification(
    @CurrentUser() user: IAuthUser,
    @Args('userId', { nullable: true }) userId?: string,
  ): Promise<string> {
    const targetUserId = userId || user.id;

    await this.pushNotificationService.sendToUser(targetUserId, {
      title: '테스트 알림',
      body: '푸시 알림 테스트입니다.',
      url: '/',
    });

    return '테스트 알림이 전송되었습니다.';
  }
}
