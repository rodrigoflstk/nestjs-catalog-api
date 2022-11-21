import { DataSource } from 'typeorm';
import { optionsDataSource } from './typeorm.config';

export default new DataSource(optionsDataSource);
