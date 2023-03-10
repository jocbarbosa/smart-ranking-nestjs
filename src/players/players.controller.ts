import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createOrUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createOrUpdatePlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }
}
