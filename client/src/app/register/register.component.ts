import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  //@Input() usersFromHomComponent:any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService, private toast: ToastrService) { }


  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      // next: response => {
      //   console.log(response);
      //   this.cancel();
      // },
      next: () => {
        this.cancel();
      },
      error: error => {
        this.toast.error(error.error.errors.Username
        );
        console.log(error)
      }

    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
