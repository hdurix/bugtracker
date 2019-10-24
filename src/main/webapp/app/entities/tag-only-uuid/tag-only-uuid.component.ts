import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';
import { AccountService } from 'app/core/auth/account.service';
import { TagOnlyUUIDService } from './tag-only-uuid.service';

@Component({
  selector: 'jhi-tag-only-uuid',
  templateUrl: './tag-only-uuid.component.html'
})
export class TagOnlyUUIDComponent implements OnInit, OnDestroy {
  tagOnlyUUIDS: ITagOnlyUUID[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tagOnlyUUIDService: TagOnlyUUIDService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tagOnlyUUIDService
      .query()
      .pipe(
        filter((res: HttpResponse<ITagOnlyUUID[]>) => res.ok),
        map((res: HttpResponse<ITagOnlyUUID[]>) => res.body)
      )
      .subscribe((res: ITagOnlyUUID[]) => {
        this.tagOnlyUUIDS = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTagOnlyUUIDS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITagOnlyUUID) {
    return item.id;
  }

  registerChangeInTagOnlyUUIDS() {
    this.eventSubscriber = this.eventManager.subscribe('tagOnlyUUIDListModification', response => this.loadAll());
  }
}
