import { ToastOptions } from 'ng2-toastr';

export class ToastConfig extends ToastOptions {
  dismiss: 'auto';
  animate = 'flyRight'; // you can override any options available
  positionClass: 'toast-bottom-right';
  showCloseButton: false;
};



