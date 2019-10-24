import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';
import { TagOnlyUUIDService } from './tag-only-uuid.service';
import { TagOnlyUUIDComponent } from './tag-only-uuid.component';
import { TagOnlyUUIDDetailComponent } from './tag-only-uuid-detail.component';
import { TagOnlyUUIDUpdateComponent } from './tag-only-uuid-update.component';
import { TagOnlyUUIDDeletePopupComponent } from './tag-only-uuid-delete-dialog.component';
import { ITagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';

@Injectable({ providedIn: 'root' })
export class TagOnlyUUIDResolve implements Resolve<ITagOnlyUUID> {
  constructor(private service: TagOnlyUUIDService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITagOnlyUUID> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TagOnlyUUID>) => response.ok),
        map((tagOnlyUUID: HttpResponse<TagOnlyUUID>) => tagOnlyUUID.body)
      );
    }
    return of(new TagOnlyUUID());
  }
}

export const tagOnlyUUIDRoute: Routes = [
  {
    path: '',
    component: TagOnlyUUIDComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugtrackerApp.tagOnlyUUID.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TagOnlyUUIDDetailComponent,
    resolve: {
      tagOnlyUUID: TagOnlyUUIDResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugtrackerApp.tagOnlyUUID.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TagOnlyUUIDUpdateComponent,
    resolve: {
      tagOnlyUUID: TagOnlyUUIDResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugtrackerApp.tagOnlyUUID.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TagOnlyUUIDUpdateComponent,
    resolve: {
      tagOnlyUUID: TagOnlyUUIDResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugtrackerApp.tagOnlyUUID.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tagOnlyUUIDPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TagOnlyUUIDDeletePopupComponent,
    resolve: {
      tagOnlyUUID: TagOnlyUUIDResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bugtrackerApp.tagOnlyUUID.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
