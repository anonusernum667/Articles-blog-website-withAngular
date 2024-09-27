import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTags(){
    return this.http.get<{ tags: string[] }>(`${environment.mainApiUrl}/tags`)
  }
}
