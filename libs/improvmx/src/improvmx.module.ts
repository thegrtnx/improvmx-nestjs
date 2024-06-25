import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ImprovmxService } from './improvmx.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ImprovmxService],
  exports: [ImprovmxService],
})
export class ImprovmxModule {}
