import { Module } from '@nestjs/common';
import { ImprovmxService } from './improvmx.service';

@Module({
  providers: [ImprovmxService],
  exports: [ImprovmxService],
})
export class ImprovmxModule {}
