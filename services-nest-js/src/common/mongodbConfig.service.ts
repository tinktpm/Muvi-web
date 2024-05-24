import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongoDBConfigService implements MongooseOptionsFactory{
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority',
    //   options: {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   },
    };
  }
}
