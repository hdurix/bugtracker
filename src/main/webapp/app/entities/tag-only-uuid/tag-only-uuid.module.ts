import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BugtrackerSharedModule } from 'app/shared/shared.module';
import { TagOnlyUUIDComponent } from './tag-only-uuid.component';
import { TagOnlyUUIDDetailComponent } from './tag-only-uuid-detail.component';
import { TagOnlyUUIDUpdateComponent } from './tag-only-uuid-update.component';
import { TagOnlyUUIDDeletePopupComponent, TagOnlyUUIDDeleteDialogComponent } from './tag-only-uuid-delete-dialog.component';
import { tagOnlyUUIDRoute, tagOnlyUUIDPopupRoute } from './tag-only-uuid.route';

const ENTITY_STATES = [...tagOnlyUUIDRoute, ...tagOnlyUUIDPopupRoute];

@NgModule({
  imports: [BugtrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TagOnlyUUIDComponent,
    TagOnlyUUIDDetailComponent,
    TagOnlyUUIDUpdateComponent,
    TagOnlyUUIDDeleteDialogComponent,
    TagOnlyUUIDDeletePopupComponent
  ],
  entryComponents: [TagOnlyUUIDDeleteDialogComponent]
})
export class BugtrackerTagOnlyUUIDModule {}
