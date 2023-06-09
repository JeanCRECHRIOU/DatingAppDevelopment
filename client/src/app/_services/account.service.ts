import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) { }

  setCurrentUser(user: User){
    console.log(user);
    this.currentUserSource.next(user);
  }

  login(model: User) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        
        const user = response;
        console.log("response");
        console.log(response);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.setCurrentUser(user);
          console.log("this.currentUser$");
          console.log(this.currentUser$);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        //return user;  si on a besoin d'utiliser l objet en retour
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
