import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard   {

  constructor(private accountService: AccountService, private toast: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(map(user => {
      console.log(user);
      if (user) return true;
      else {
        this.toast.error('you shall not pass')
        return false;
      }
    }
    ))
  }
}