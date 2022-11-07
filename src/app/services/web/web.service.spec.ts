import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { WebService } from './web.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WebService', () => {
  let service: WebService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(WebService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
