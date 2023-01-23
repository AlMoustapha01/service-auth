import { Injectable } from '@nestjs/common';
import { Hello } from './type';


@Injectable()
export class AppService {
  getHello(): Hello {
    return {
      name:'Autho',
      version:'0.1'
    };
  }
}
