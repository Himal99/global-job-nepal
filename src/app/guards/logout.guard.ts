import { CanActivateFn } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');

  if (token ==  undefined) {
    return true;
  }
  else {

    return false;
  }
};
