import { TestBed } from '@angular/core/testing';

import { MiniUrlService } from './miniurl.service';

describe('MiniurlService', () => {
  let service: MiniUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
