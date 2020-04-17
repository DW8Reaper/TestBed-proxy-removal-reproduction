import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { SomeService } from "./some.service";

class AnyClass {}

describe("AppComponent", () => {
  beforeEach(async(() => {

    /* workaround A - create some type of class not just an empty object */
    // const mockedSomeService = new Proxy(new AnyClass() as SomeService, {
    const mockedSomeService = new Proxy({} as SomeService, {
      get: (target, prop) => {
        if (prop === "returnSomething") {
          return () => "mocked something";
        } else {
          return target[prop];
        }
      },
    });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      /* workaround B - use a factory instead of useValue */
      // providers: [{ provide: SomeService, useFactory: () => mockedSomeService }],
      providers: [{ provide: SomeService, useValue: mockedSomeService }],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const component = TestBed.createComponent(AppComponent);

    const result = component.componentInstance.callTheService();
    expect(result).toEqual("mocked something");
  });
});
