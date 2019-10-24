import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITagOnlyUUID } from 'app/shared/model/tag-only-uuid.model';

type EntityResponseType = HttpResponse<ITagOnlyUUID>;
type EntityArrayResponseType = HttpResponse<ITagOnlyUUID[]>;

@Injectable({ providedIn: 'root' })
export class TagOnlyUUIDService {
  public resourceUrl = SERVER_API_URL + 'api/tag-only-uuids';

  constructor(protected http: HttpClient) {}

  create(tagOnlyUUID: ITagOnlyUUID): Observable<EntityResponseType> {
    return this.http.post<ITagOnlyUUID>(this.resourceUrl, tagOnlyUUID, { observe: 'response' });
  }

  update(tagOnlyUUID: ITagOnlyUUID): Observable<EntityResponseType> {
    return this.http.put<ITagOnlyUUID>(this.resourceUrl, tagOnlyUUID, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITagOnlyUUID>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITagOnlyUUID[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
