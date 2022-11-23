import { Exclude } from 'class-transformer';
import { User } from 'src/modules/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  cast: string;

  @CreateDateColumn()
  published_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.movie, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
