import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BugtrackerTestModule } from '../../../test.module';
import { TagOnlyUUIDUpdateComponent } from 'app/entities/tag-only-uuid/tag-only-uuid-update.component';
import { TagOnlyUUIDService } from 'app/entities/tag-only-uuid/tag-only-uuid.service';
import { TagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';

describe('Component Tests', () => {
  describe('TagOnlyUUID Management Update Component', () => {
    let comp: TagOnlyUUIDUpdateComponent;
    let fixture: ComponentFixture<TagOnlyUUIDUpdateComponent>;
    let service: TagOnlyUUIDService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BugtrackerTestModule],
        declarations: [TagOnlyUUIDUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TagOnlyUUIDUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TagOnlyUUIDUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagOnlyUUIDService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TagOnlyUUID(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TagOnlyUUID();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
