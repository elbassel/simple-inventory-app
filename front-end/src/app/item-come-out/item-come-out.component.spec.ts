import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComeOutComponent } from './item-come-out.component';

describe('ItemComeOutComponent', () => {
  let component: ItemComeOutComponent;
  let fixture: ComponentFixture<ItemComeOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComeOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
