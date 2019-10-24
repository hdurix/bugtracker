import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.BugtrackerProjectModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.BugtrackerTagModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.BugtrackerTicketModule)
      },
      {
        path: 'tag-only-uuid',
        loadChildren: () => import('./tag-only-uuid/tag-only-uuid.module').then(m => m.BugtrackerTagOnlyUUIDModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BugtrackerEntityModule {}
