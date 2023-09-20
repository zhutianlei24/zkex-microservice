import { Test, TestingModule } from '@nestjs/testing';
import { SyncserviceController } from './syncservice.controller';
import { SyncserviceService } from './syncservice.service';

describe('SyncserviceController', () => {
  let controller: SyncserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncserviceController],
      providers: [SyncserviceService],
    }).compile();

    controller = module.get<SyncserviceController>(SyncserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
