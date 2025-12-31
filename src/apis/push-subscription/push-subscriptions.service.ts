import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePushSubscriptionInput } from './dto/create-push-subscription.input';
import { Repository } from 'typeorm';
import { PushSubscription } from './entities/push-subscription.entity';

@Injectable()
export class PushSubscriptionsService {
  constructor(
    @InjectRepository(PushSubscription)
    private readonly pushSubscriptionsRepository: Repository<PushSubscription>,
  ) {}

  async create(userId: string, input: CreatePushSubscriptionInput) {
    const { endpoint, expirationTime, keys } = input;
    return this.pushSubscriptionsRepository.save({
      user: { id: userId },
      endpoint,
      expirationTime: expirationTime ?? null,
      keys,
    });
  }

  async removeByEndpoint(userId: string, endpoint: string) {
    await this.pushSubscriptionsRepository.delete({
      user: { id: userId },
      endpoint,
    });
  }

  async findAllByUserId(userId: string) {
    return this.pushSubscriptionsRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findAll() {
    return this.pushSubscriptionsRepository.find({ relations: ['user'] });
  }

  async remove(pushSubscription: PushSubscription) {
    await this.pushSubscriptionsRepository.remove(pushSubscription);
  }
}
