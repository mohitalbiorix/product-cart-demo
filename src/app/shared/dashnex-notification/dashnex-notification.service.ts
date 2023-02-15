import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DashnexNotificationService {

  constructor() { }

  showSuccessMessage(content: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: content
    });
  }
  showErrorMessage(content: string) {
    Swal.fire({
      icon: 'error',
      title: 'Something Went Wrong',
      text: content
    });
  }

  showDeleteConfirmationDialog() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }

  showDeleteConfirmationSuccess() {
    return Swal.fire('Deleted!', '', 'success');
  }
}
