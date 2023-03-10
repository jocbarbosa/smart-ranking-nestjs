import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import * as uuid from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  private players: Player[] = [];

  async getAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const foundPlayer = await this.players.find(
      (player) => player.email === email,
    );

    if (!foundPlayer) {
      throw new NotFoundException(`player ${email} not found`);
    }

    return foundPlayer;
  }

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const foundPlayer = this.players.find((player) => player.email === email);

    if (foundPlayer) {
      await this.updatePlayer(foundPlayer, createPlayerDto);
    } else {
      await this.createPlayer(createPlayerDto);
    }
  }

  private async updatePlayer(
    foundPlayer: Player,
    createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    const { name } = createPlayerDto;

    foundPlayer.name = name;
  }

  private async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
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
