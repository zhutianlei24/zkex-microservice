import { PartialType } from '@nestjs/mapped-types';
import { CreateSyncserviceDto } from './create-syncservice.dto';

export class UpdateSyncserviceDto extends PartialType(CreateSyncserviceDto) {}
