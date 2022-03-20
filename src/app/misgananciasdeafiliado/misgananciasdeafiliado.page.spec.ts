import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisgananciasdeafiliadoPage } from './misgananciasdeafiliado.page';

describe('MisgananciasdeafiliadoPage', () => {
  let component: MisgananciasdeafiliadoPage;
  let fixture: ComponentFixture<MisgananciasdeafiliadoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MisgananciasdeafiliadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisgananciasdeafiliadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
