import { Component } from '@angular/core';
import { SomeService } from './some.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(private readonly someService: SomeService) {}

  public callTheService(): string {
    return this.someService.returnSomething();
  }
}
