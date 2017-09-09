import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth-service/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  entryForm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _toastService: ToastService
  ) { }

  buildForm() {
    this.entryForm = this._formBuilder.group({
      email: ['hanafi.desar@gmail.com', [Validators.required, CustomValidators.email]],
      password: ['123456', Validators.required]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit(values, event) {
    this._loginService.login()
      .subscribe(response => {
        this._router.navigate(['/main/dashboard-main']);
      },
      (error) => {
        this._toastService.showToast(error);
      });
  }

}
