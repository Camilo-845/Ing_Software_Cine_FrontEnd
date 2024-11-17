import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListarComponent } from './table-listar.component';

describe('TableListarComponent', () => {
  let component: TableListarComponent;
  let fixture: ComponentFixture<TableListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
