import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BugtrackerTestModule } from '../../../test.module';
import { TagOnlyUUIDComponent } from 'app/entities/tag-only-uuid/tag-only-uuid.component';
import { TagOnlyUUIDService } from 'app/entities/tag-only-uuid/tag-only-uuid.service';
import { TagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';

describe('Component Tests', () => {
  describe('TagOnlyUUID Management Component', () => {
    let comp: TagOnlyUUIDComponent;
    let fixture: ComponentFixture<TagOnlyUUIDComponent>;
    let service: TagOnlyUUIDService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BugtrackerTestModule],
        declarations: [TagOnlyUUIDComponent],
        providers: []
      })
        .overrideTemplate(TagOnlyUUIDComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TagOnlyUUIDComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagOnlyUUIDService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TagOnlyUUID(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tagOnlyUUIDS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
