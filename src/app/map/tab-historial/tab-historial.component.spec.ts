import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHistorialComponent } from './tab-historial.component';

describe('TabHistorialComponent', () => {
  let component: TabHistorialComponent;
  let fixture: ComponentFixture<TabHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabHistorialComponent]
    });
    fixture = TestBed.createComponent(TabHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
