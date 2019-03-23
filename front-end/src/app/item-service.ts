import { Injectable } from '@angular/core';
import {  HttpClientModule, HttpClient } from '@angular/common/http';
import {Item}  from './Item';
import {Observable} from "rxjs/index";
const host = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  loadItems(){
    return this.http.get(`${host}/items`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${host}/items`, item);
  }

  // getUsers() : Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.baseUrl);
  // }

  getItemById(_id: string): Observable<Item> {
    return this.http.get<Item>(`${host}/items/${_id}`);
  }

  itemsComeOut(item: Item): Observable<Item> {
    return this.http.patch<Item>(`${host}/items/${item._id}/quantity?operation=comeOut`, item);
  }

  itemsGoIn(item: Item): Observable<Item> {
    return this.http.patch<Item>(`${host}/items/${item._id}/quantity?operation=goIn`, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${host}/items/${item._id}`, item);
  }

  deleteUser(_id: string): Observable<Item> {
    return this.http.delete<Item>(`${host}/items/${_id}`);
  }
}
