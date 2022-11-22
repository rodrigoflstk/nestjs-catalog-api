import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Movie } from './entities/movie.entity';
import { User } from '../auth/entities/user.entity';
import { GetMovieFilterDto } from './dtos/get-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movie')
@UseGuards(AuthGuard())
export class MovieController {
  private logger = new Logger('MovieService', { timestamp: true });
  constructor(private readonly movieService: MovieService) {}

  @Post('/create')
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(
      `"${user.username}" has created a new movie Named: ${createMovieDto.name}.`,
    );
    return this.movieService.create(createMovieDto, user);
  }

  @Get('list/all')
  findAll(
    @Query() getMovieFilterDto: GetMovieFilterDto,
    @GetUser() user: User,
  ): Promise<Movie[]> {
    this.logger.verbose(`"${user.username}" is getting all movies.`);
    return this.movieService.findAll(getMovieFilterDto, user);
  }

  @Get('list/:uuid')
  findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(`"${user.username}" is getting a movie ID: ${uuid}}.`);
    return this.movieService.findOne(uuid, user);
  }

  @Patch('update/:uuid')
  update(
    @Param('uuid') uuid: string,
    @GetUser() user: User,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    this.logger.verbose(`"${user.username}" is updating a movie ID: ${uuid}}.`);
    return this.movieService.update(uuid, user, updateMovieDto);
  }

  @Delete('delete/:uuid')
  remove(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @GetUser() user: User,
  ) {
    this.logger.verbose(`"${user.username}" is deleting a movie ID: ${uuid}}.`);
    return this.movieService.remove(uuid, user);
  }
}
