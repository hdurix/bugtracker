export interface ITagOnlyUUID {
  id?: number;
  label?: string;
}

export class TagOnlyUUID implements ITagOnlyUUID {
  constructor(public id?: number, public label?: string) {}
}
