import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { FileService } from './file.service';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpModule ],
        providers: [
            FileService,
            { provide: XHRBackend, useClass: MockBackend }
        ]
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
