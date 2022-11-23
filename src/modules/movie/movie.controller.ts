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
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user/decorators/get-user.decorator';
import { Movie } from './entities/movie.entity';
import { User } from '../auth/user/entities/user.entity';
import { GetMovieFilterDto } from './dtos/get-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie - Endpoints')
@Controller('movie')
@UseInterceptors(CacheInterceptor)
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
    return this.movieService.create(createMovieDto);
  }

  @CacheTTL(5)
  @CacheKey('custom_key')
  @Get('list/all')
  findAll(
    @Query() getMovieFilterDto: GetMovieFilterDto,
    @GetUser() user: User,
  ): Promise<Movie[]> {
    this.logger.verbose(`"${user.username}" is getting all movies.`);
    return this.movieService.findAll(getMovieFilterDto);
  }

  @Get('list/:id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(`"${user.username}" is getting a movie ID: ${id}.`);
    return this.movieService.findOneMovie(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    this.logger.verbose(`"${user.username}" is updating a movie ID: ${id}.`);
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() user: User) {
    this.logger.verbose(`"${user.username}" is deleting a movie ID: ${id}.`);
    return this.movieService.remove(id, user);
  }
}
