import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}`;

describe('App e2e tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth - ', () => {
    describe('Register', () => {
      it('should success', () => {
        return pactum
          .spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
            email: 't@t.t',
            password: '1234',
          })
          .expectStatus(201);
      });
      it('should fail if missing params', () => {
        return pactum
          .spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
            password: '1234',
          })
          .expectStatus(400);
      });
      it('should fail if params invalidate', () => {
        return pactum
          .spec()
          .post(`${BASE_URL}/auth/register`)
          .withBody({
            email: 't@',
            password: '1234',
          })
          .expectStatus(400);
      });
    });
    describe('Login', () => {
      it('should success', () => {
        return pactum
          .spec()
          .post(`${BASE_URL}/auth/login`)
          .withBody({
            email: 't@t.t',
            password: '1234',
          })
          .expectStatus(200)
          .stores('token', 'token');
      });
    });
  });

  describe("User's ", () => {
    describe('Information', () => {
      it('should success', () => {
        return pactum.spec().get(`${BASE_URL}/user`).withBearerToken('$S{token}').expectStatus(200);
      });
    });

    describe('Notes', () => {
      it('should success', () => {});
    });
  });

  describe('Note - ', () => {
    describe('Create', () => {
      it('should success', () => {});
    });

    describe('Update', () => {
      it('should success', () => {});
    });

    describe('Delete', () => {
      it('should success', () => {});
    });
  });
});
