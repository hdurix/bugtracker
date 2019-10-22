import { Moment } from 'moment';
import { IProject } from 'app/shared/model/project.model';
import { IUser } from 'app/core/user/user.model';
import { ITag } from 'app/shared/model/tag.model';

export interface ITicket {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: Moment;
  done?: boolean;
  project?: IProject;
  assignedTo?: IUser;
  tags?: ITag[];
}

export class Ticket implements ITicket {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public dueDate?: Moment,
    public done?: boolean,
    public project?: IProject,
    public assignedTo?: IUser,
    public tags?: ITag[]
  ) {
    this.done = this.done || false;
  }
}
