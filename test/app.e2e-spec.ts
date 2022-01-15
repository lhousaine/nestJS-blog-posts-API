import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return successfull state when running the ping test', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect({ success: true });
  });

  it('should return error with message Tags parameter is required', () => {
    return request(app.getHttpServer()).get('/posts').expect({
      statusCode: 400,
      message: 'Tags parameter is required',
      error: 'Bad Request',
    });
  });

  it('should return error with message sortBy parameter is invalid', () => {
    return request(app.getHttpServer())
      .get('/posts?tags=history,culture&sortBy=tags')
      .expect({
        statusCode: 400,
        message: 'sortBy parameter is invalid',
        error: 'Bad Request',
      });
  });

  it('should return error with message direction parameter is required', () => {
    return request(app.getHttpServer())
      .get('/posts?tags=history,culture&sortBy=reads&direction=test')
      .expect({
        statusCode: 400,
        message: 'direction parameter is invalid',
        error: 'Bad Request',
      });
  });

  it('should return a result with status 200 sortBy id and ordered in ascending order', async () => {
    return request(app.getHttpServer())
      .get('/posts?tags=history,culture')
      .expect(200);
  });

  it('should return a result ordered by reads in ascending order with status 200 ', async () => {
    return request(app.getHttpServer())
      .get('/posts?tags=history,culture&sortBy=reads')
      .expect(200);
  });

  it('should return a result ordered by reads in descending order with status 200 ', async () => {
    return request(app.getHttpServer())
      .get('/posts?tags=history,culture&sortBy=reads&direction=desc')
      .expect(200);
  });
});
