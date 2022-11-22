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
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto, user: User): Promise<Movie> {
    const { name, description, genre } = createMovieDto;

    const movie = this.movieRepository.create({
      name,
      description,
      genre,
      user,
    });

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

  async findAll(
    getMovieFilterDto: GetMovieFilterDto,
    user: User,
  ): Promise<Movie[]> {
    const { search } = getMovieFilterDto;

    const query = this.movieRepository.createQueryBuilder('movie');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(movie.name) LIKE LOWER(:search) OR LOWER(movie.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const movie = query.getMany();
    return movie;
  }

  async findOne(id: string, user: User): Promise<Movie> {
    const foundMovie = await this.movieRepository.findOne({
      where: { id, user },
    });
    // const idLength = foundMovie.id.length;

    if (!foundMovie) {
      throw new NotFoundException('this movie does not exists');
    }
    return foundMovie;
  }

  // update(id: number, updateMovieDto: UpdateMovieDto) {
  //   return `This action updates a #${id} movie`;
  // }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
