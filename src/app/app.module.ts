import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './auth/services/config.service';

export function appConfigInit(configService: ConfigService) {
  return () => { return configService.load() }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      deps:[ConfigService],
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
