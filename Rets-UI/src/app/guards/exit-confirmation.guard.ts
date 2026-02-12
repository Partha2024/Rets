import { CanDeactivateFn } from '@angular/router';

export const canDeactivateGuard: CanDeactivateFn<any> = (component: any) => {
  if (component && component.canDeactivate) {
    return component.canDeactivate();
  }
  return true;
};
