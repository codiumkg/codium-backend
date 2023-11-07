import { Module } from '@nestjs/common';
import { RegRequestService } from './reg-request.service';
import { RegRequestController } from './reg-request.controller';

@Module({
  controllers: [RegRequestController],
  providers: [RegRequestService],
})
export class RegRequestModule {}
