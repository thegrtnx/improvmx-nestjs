import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ImprovmxService } from "./improvmx.service";

@Module({
	imports: [HttpModule, ConfigModule],
	providers: [ImprovmxService],
	exports: [ImprovmxService],
})
export class ImprovmxModule {}
