import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/services/cats.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
