import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUser, user } from '../../auth/types/user.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authservice:AuthService) { }



  getCurrentUserData():Observable<user> {
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
    });

    return this.http.get<user>(`${environment.mainApiUrl}/user`, {headers})
  }
  updateCurrentUser(user: UpdateUser):Observable<user>{
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
    });
    return this.http.put<user>(`${environment.mainApiUrl}/user`, user, {headers})
  }
  getProfile(username:string | null){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
    });
    return this.http.get<user>(`${environment.mainApiUrl}/profiles/${username}`, {headers})
  }
  followUser(username: string | undefined){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
    });
    return this.http.post(`${environment.mainApiUrl}/profiles/${username}/follow`, {}, { headers })
  }
  unFollowUser(username: string | undefined){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
    });
    return this.http.delete(`${environment.mainApiUrl}/profiles/${username}/follow`, {headers})
  }
}
