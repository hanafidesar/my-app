import swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable()
export class SweetalertService {

  constructor() { }

  notWorkingYet() {
    swal(
      'Sorry',
      'This function not working yet',
      'info'
    );
  }

  follow() {
    swal(
      'Sorry',
      'This function not working yet',
      'info'
    );
  }

  error() {
    swal(
      'Sorry',
      'This function not working yet',
      'info'
    );
  }

  errorForm() {
    swal(
      'Error Input',
      'Check your input form',
      'error'
    );
  }

  errorConnection() {
    swal(
      'Error Input',
      'Check your internet connection',
      'error'
    );
  }
}
