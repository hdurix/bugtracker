import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BugtrackerTestModule } from '../../../test.module';
import { TagOnlyUUIDDetailComponent } from 'app/entities/tag-only-uuid/tag-only-uuid-detail.component';
import { TagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';

describe('Component Tests', () => {
  describe('TagOnlyUUID Management Detail Component', () => {
    let comp: TagOnlyUUIDDetailComponent;
    let fixture: ComponentFixture<TagOnlyUUIDDetailComponent>;
    const route = ({ data: of({ tagOnlyUUID: new TagOnlyUUID(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BugtrackerTestModule],
        declarations: [TagOnlyUUIDDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TagOnlyUUIDDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TagOnlyUUIDDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tagOnlyUUID).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
