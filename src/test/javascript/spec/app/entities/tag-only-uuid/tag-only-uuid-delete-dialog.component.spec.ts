import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BugtrackerTestModule } from '../../../test.module';
import { TagOnlyUUIDDeleteDialogComponent } from 'app/entities/tag-only-uuid/tag-only-uuid-delete-dialog.component';
import { TagOnlyUUIDService } from 'app/entities/tag-only-uuid/tag-only-uuid.service';

describe('Component Tests', () => {
  describe('TagOnlyUUID Management Delete Component', () => {
    let comp: TagOnlyUUIDDeleteDialogComponent;
    let fixture: ComponentFixture<TagOnlyUUIDDeleteDialogComponent>;
    let service: TagOnlyUUIDService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BugtrackerTestModule],
        declarations: [TagOnlyUUIDDeleteDialogComponent]
      })
        .overrideTemplate(TagOnlyUUIDDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TagOnlyUUIDDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagOnlyUUIDService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
