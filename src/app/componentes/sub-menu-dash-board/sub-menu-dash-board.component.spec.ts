import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuDashBoardComponent } from './sub-menu-dash-board.component';

describe('SubMenuDashBoardComponent', () => {
  let component: SubMenuDashBoardComponent;
  let fixture: ComponentFixture<SubMenuDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenuDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
