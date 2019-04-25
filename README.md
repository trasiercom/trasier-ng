[![Travis build badge](https://img.shields.io/travis/trasiercom/trasier-ng.svg)](https://travis-ci.org/kreuzerk/ng-sortgrid)
[![codecov](https://codecov.io/gh/trasiercom/trasier-ng/branch/master/graph/badge.svg)](https://codecov.io/gh/kreuzerk/ng-sortgrid)
[![angular7](https://img.shields.io/badge/angular%207%20ready-true-green.svg)]()

# TrasierNg

Angular client for the Trasier system. Trasier is a Data as a Service platform that gives a quick insight into messages exchanged by software services across teams, projects or even companies. It can be used in Software development, bug-, performance-, business- analysis and integration testing. [Find out more on our official webpage](https://trasier.com/#/)

## Usage
### 1. Apply the Trasier interceptor
Integrate the Trasier Http Interceptor in your app.module.

```
import { TRASIER_INTERCEPTOR } from 'trasier-ng';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [TRASIER_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 2. Init the TrasierNgService and start your conversation
Use the init method in your ```app.component.ts``` of the TrasierNgService to set your systemname:
```
import { TrasierNgService } from 'trasier-ng';

export class AppComponent implements OnInit {

  constructor(private trasierService: TrasierNgService) {}

  ngOnInit(): void {
    this.trasierService.init('trasier-test');
  }
  ...
}
```

Use the TrasierNgService to start a new conversation. The new conversation is available during your session or until you start a new conversation by calling ```startConversation()``` again.
```
this.trasierService.startConversation();
```

In case you want to cancel a conversation manually just use the ```endConversation()``` method:
```
this.trasierService.endConversation();
```
