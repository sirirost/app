import { TestBed, inject } from '@angular/core/testing';

import { UploadsService } from './uploads.service';

describe('UuloadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadsService]
    });
  });

  it('should be created', inject([UploadsService], (service: UploadsService) => {
    expect(service).toBeTruthy();
  }));
});
