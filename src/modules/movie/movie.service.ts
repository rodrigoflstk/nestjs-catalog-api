import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMovieFilterDto } from './dtos/get-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);

    try {
      await this.movieRepository.save(movie);
      return movie;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Movie already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll(getMovieFilterDto: GetMovieFilterDto): Promise<Movie[]> {
    const { search } = getMovieFilterDto;

    const query = this.movieRepository.createQueryBuilder('movie');

    if (search) {
      query.andWhere(
        '(LOWER(movie.name) LIKE LOWER(:search) OR LOWER(movie.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const movie = query.getMany();
    return movie;
  }

  async findOneMovie(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('this movie does not exists');
    }

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOneMovie(id);

    const { description } = updateMovieDto;

    movie.description = description;

    await this.movieRepository.save(movie);

    return movie;
  }

  async remove(id: string, user: User): Promise<void> {
    await this.movieRepository.delete({ id, user });
  }
}
