import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SomeService {
  public returnSomething(): string {
    return 'something';
  }
}
