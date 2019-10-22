import { ITicket } from 'app/shared/model/ticket.model';

export interface ITag {
  id?: number;
  label?: string;
  tickets?: ITicket[];
}

export class Tag implements ITag {
  constructor(public id?: number, public label?: string, public tickets?: ITicket[]) {}
}
