import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITagOnlyUUID, TagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';
import { TagOnlyUUIDService } from './tag-only-uuid.service';

@Component({
  selector: 'jhi-tag-only-uuid-update',
  templateUrl: './tag-only-uuid-update.component.html'
})
export class TagOnlyUUIDUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    label: [null, [Validators.minLength(3)]]
  });

  constructor(protected tagOnlyUUIDService: TagOnlyUUIDService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tagOnlyUUID }) => {
      this.updateForm(tagOnlyUUID);
    });
  }

  updateForm(tagOnlyUUID: ITagOnlyUUID) {
    this.editForm.patchValue({
      id: tagOnlyUUID.id,
      label: tagOnlyUUID.label
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tagOnlyUUID = this.createFromForm();
    if (tagOnlyUUID.id !== undefined) {
      this.subscribeToSaveResponse(this.tagOnlyUUIDService.update(tagOnlyUUID));
    } else {
      this.subscribeToSaveResponse(this.tagOnlyUUIDService.create(tagOnlyUUID));
    }
  }

  private createFromForm(): ITagOnlyUUID {
    return {
      ...new TagOnlyUUID(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITagOnlyUUID>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
