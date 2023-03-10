import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import * as uuid from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  private players: Player[] = [];

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    await this.createPlayer(createPlayerDto);
  }

  private createPlayer(createPlayerDto: CreatePlayerDto): void {
    const { name, email, phoneNumber } = createPlayerDto;

    const player: Player = {
      _id: uuid.v4(),
      email,
      name,
      phoneNumber,
      ranking: '',
      position: 1,
      photoUrl: 'https://any-url.com',
    };

    this.logger.log(`create : ${JSON.stringify(player)}`);

    this.players.push(player);
  }
}
