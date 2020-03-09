import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUrlMakerComponent } from './mini-url-maker.component';

describe('MiniUrlMakerComponent', () => {
  let component: MiniUrlMakerComponent;
  let fixture: ComponentFixture<MiniUrlMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniUrlMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniUrlMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
