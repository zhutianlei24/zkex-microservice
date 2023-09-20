import { Test, TestingModule } from '@nestjs/testing';
import { SyncserviceService } from './syncservice.service';

describe('SyncserviceService', () => {
  let service: SyncserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncserviceService],
    }).compile();

    service = module.get<SyncserviceService>(SyncserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
