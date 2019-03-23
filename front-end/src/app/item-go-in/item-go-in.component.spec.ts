import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGoInComponent } from './item-go-in.component';

describe('ItemGoInComponent', () => {
  let component: ItemGoInComponent;
  let fixture: ComponentFixture<ItemGoInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGoInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGoInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
