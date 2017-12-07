import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFarmerinformationComponent } from './add-farmerinformation.component';

describe('AddFarmerinformationComponent', () => {
  let component: AddFarmerinformationComponent;
  let fixture: ComponentFixture<AddFarmerinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFarmerinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFarmerinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
