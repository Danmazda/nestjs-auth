import { HttpCode } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "This is the to do list REST API"', () => {
      expect(appController.getHello()).toBe('This is the to do list REST API');
    });
  });

  describe('Requests', () => {
    it(' GET should return all elements from the list', () => {
      expect(fetch('http://localhost:3000/list')).toBe(HttpCode(200));
    });
  });
});
