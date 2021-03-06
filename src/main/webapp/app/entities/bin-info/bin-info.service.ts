import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBinInfo } from 'app/shared/model/bin-info.model';

type EntityResponseType = HttpResponse<IBinInfo>;
type EntityArrayResponseType = HttpResponse<IBinInfo[]>;

@Injectable({ providedIn: 'root' })
export class BinInfoService {
    public resourceUrl = SERVER_API_URL + 'api/bin-infos';

    constructor(protected http: HttpClient) {}

    create(binInfo: IBinInfo): Observable<EntityResponseType> {
        return this.http.post<IBinInfo>(this.resourceUrl, binInfo, { observe: 'response' });
    }

    update(binInfo: IBinInfo): Observable<EntityResponseType> {
        return this.http.put<IBinInfo>(this.resourceUrl, binInfo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBinInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBinInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
