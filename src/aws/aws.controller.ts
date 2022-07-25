import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Param, Post, UploadedFile, UseFilters, UseInterceptors, Body } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { AwsService } from './aws.service';

@UseFilters(HttpExceptionFilter)
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}


  @Get()
  getHello() {
    return 'hello, this is aws s3.';
  }

 
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.awsService.uploadFileToS3('cats', file);
  }


  @Post('geturlbykey')
  getImageUrl(@Body('key') key: string) {
    return this.awsService.getAwsS3FileUrl(key);
  }


}
