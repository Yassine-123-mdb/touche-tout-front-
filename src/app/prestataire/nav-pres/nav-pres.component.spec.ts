import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPresComponent } from './nav-pres.component';

describe('NavPresComponent', () => {
  let component: NavPresComponent;
  let fixture: ComponentFixture<NavPresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavPresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
