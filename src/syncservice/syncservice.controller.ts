import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SyncserviceService } from './syncservice.service';
import { CreateSyncserviceDto } from './dto/create-syncservice.dto';
import { UpdateSyncserviceDto } from './dto/update-syncservice.dto';

@Controller('syncservice')
export class SyncserviceController {
  constructor(private readonly syncserviceService: SyncserviceService) {}

  @Post()
  create(@Body() createSyncserviceDto: CreateSyncserviceDto) {
    return this.syncserviceService.create(createSyncserviceDto);
  }

  @Get()
  findAll() {
    return this.syncserviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.syncserviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSyncserviceDto: UpdateSyncserviceDto) {
    return this.syncserviceService.update(+id, updateSyncserviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.syncserviceService.remove(+id);
  }
}
