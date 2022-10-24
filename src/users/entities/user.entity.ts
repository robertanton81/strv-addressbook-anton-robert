import {
  Entity,
  EntityRepositoryType,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';
import { UsersRepository } from '../repository/users.repository';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { FirebaseUser } from '../../firebase/entities/firebase-user.entity';

@Entity({ customRepository: () => UsersRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UsersRepository;

  @ApiProperty()
  @Property({ length: 255, hidden: true })
  @Exclude()
  password!: string;

  @ApiProperty()
  @Unique()
  @Property({ length: 50, hidden: true })
  email: string;

  @ApiProperty()
  @OneToOne({ nullable: true, inversedBy: 'appUser' })
  firebaseUser: FirebaseUser;
}
