import { Injectable } from '@nestjs/common';
import { CreateSyncserviceDto } from './dto/create-syncservice.dto';
import { UpdateSyncserviceDto } from './dto/update-syncservice.dto';

@Injectable()
export class SyncserviceService {
  create(createSyncserviceDto: CreateSyncserviceDto) {
    return 'This action adds a new syncservice';
  }

  findAll() {
    return `This action returns all syncservice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} syncservice`;
  }

  update(id: number, updateSyncserviceDto: UpdateSyncserviceDto) {
    return `This action updates a #${id} syncservice`;
  }

  remove(id: number) {
    return `This action removes a #${id} syncservice`;
  }
}
