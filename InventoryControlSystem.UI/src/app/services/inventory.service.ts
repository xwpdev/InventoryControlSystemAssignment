import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Inventory from '../models/inventory';
import { CustomErrorHandler } from '../models/custom-error-handler';
import { API_CONFIG } from 'src/configs/api';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private endpoint = `${API_CONFIG.LINK}/Inventory`;
  constructor(private httpClient: HttpClient) { }

  List(): Observable<Inventory[]> {
    return this.httpClient
      .get<Inventory[]>(this.endpoint)
      .pipe(catchError(CustomErrorHandler.handle))
  }

  Add(data: Inventory): Observable<Inventory> {
    return this.httpClient
      .post<Inventory>(this.endpoint, data)
      .pipe(catchError(CustomErrorHandler.handle))
  }

  Delete(data: Inventory): Observable<boolean> {
    return this.httpClient
      .post<boolean>(this.endpoint, {
        params: {
          inventoryId: data.id
        }
      })
      .pipe(catchError(CustomErrorHandler.handle))
  }
}
