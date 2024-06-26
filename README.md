# improvmx-nestjs

A NestJS library for ImprovMX API.

## Installation

```bash
npm install --save improvmx-nestjs
```

import { Module } from '@nestjs/common';
import { ImprovmxModule } from 'improvmx-nestjs';

@Module({
imports: [ImprovmxModule],
})
export class AppModule {}
