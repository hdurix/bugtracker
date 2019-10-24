import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';

@Component({
  selector: 'jhi-tag-only-uuid-detail',
  templateUrl: './tag-only-uuid-detail.component.html'
})
export class TagOnlyUUIDDetailComponent implements OnInit {
  tagOnlyUUID: ITagOnlyUUID;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tagOnlyUUID }) => {
      this.tagOnlyUUID = tagOnlyUUID;
    });
  }

  previousState() {
    window.history.back();
  }
}
