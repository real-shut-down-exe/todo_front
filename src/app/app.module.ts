import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './auth/services/config.service';
import { StartPageComponent } from './start-page/start-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EditModalComponent } from './dashboard/components/edit-modal/edit-modal.component';

export function appConfigInit(configService: ConfigService) {
  return () => { return configService.load() }
}

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    DashboardComponent,
    EditModalComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
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
