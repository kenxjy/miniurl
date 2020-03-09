import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUrlListComponent } from './mini-url-list.component';

describe('MiniUrlListComponent', () => {
  let component: MiniUrlListComponent;
  let fixture: ComponentFixture<MiniUrlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniUrlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniUrlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
