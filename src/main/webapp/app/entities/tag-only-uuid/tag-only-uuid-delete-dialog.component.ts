import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';
import { TagOnlyUUIDService } from './tag-only-uuid.service';

@Component({
  selector: 'jhi-tag-only-uuid-delete-dialog',
  templateUrl: './tag-only-uuid-delete-dialog.component.html'
})
export class TagOnlyUUIDDeleteDialogComponent {
  tagOnlyUUID: ITagOnlyUUID;

  constructor(
    protected tagOnlyUUIDService: TagOnlyUUIDService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tagOnlyUUIDService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tagOnlyUUIDListModification',
        content: 'Deleted an tagOnlyUUID'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tag-only-uuid-delete-popup',
  template: ''
})
export class TagOnlyUUIDDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tagOnlyUUID }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TagOnlyUUIDDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tagOnlyUUID = tagOnlyUUID;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tag-only-uuid', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tag-only-uuid', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
