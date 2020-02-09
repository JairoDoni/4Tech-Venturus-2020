import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositorieService } from './user-repositorie';

describe('UserRepositorieService', () => {
  let service: UserRepositorieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositorieService],
    }).compile();

    service = module.get<UserRepositorieService>(UserRepositorieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
