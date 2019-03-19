import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasierNgComponent } from './trasier-ng.component';

describe('TrasierNgComponent', () => {
  let component: TrasierNgComponent;
  let fixture: ComponentFixture<TrasierNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasierNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasierNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
