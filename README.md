# improvmx-nestjs

A NestJS library for ImprovMX API.

## Installation

```bash
npm install --save improvmx-nestjs

```

## Usage

To use this library, import the `ImprovmxModule` in your NestJS application module:

```bash
import { Module } from '@nestjs/common';
import { ImprovmxModule } from 'improvmx-nestjs';

@Module({
  imports: [ImprovmxModule],
})
export class AppModule {

```

## Configuration

You can configure the `ImprovMX API key` by using the NestJS Config module. Add the following environment variables to your .env file. [Retreive your improvmx api key](https://app.improvmx.com/api)

`IMPROVMX_API_KEY=`

## Documentation

[Documentation](https://improvmx.com/api/)

## Donwload

You can download the improvmx-nestjs library from the following sources:

- [npm:](https://www.npmjs.com/package/improvmx-nestjs) `npm install improvmx-nestjs`

- [GitHub:](https://github.com/thegrtnx/improvmx-nestjs) `git clone https://github.com/thegrtnx/improvmx-nestjs.git`

## Author

[Abolade Greatness](https://www.github.com/thegrtnx)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thegrtnx)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/thegrtnx)

## Contributing

Contributions are always welcome!

Please adhere to this project's [code of conduct](https://github.com/thegrtnx/improvmx-nestjs/blob/main/CODE_OF_CONDUCT.md).

## License

[MIT](https://github.com/thegrtnx/improvmx-nestjs/blob/main/LICENSE/)
