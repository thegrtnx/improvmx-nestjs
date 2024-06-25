import { Test, TestingModule } from '@nestjs/testing';
import { ImprovmxService } from './improvmx.service';

describe('ImprovmxService', () => {
  let service: ImprovmxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImprovmxService],
    }).compile();

    service = module.get<ImprovmxService>(ImprovmxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
