import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { AppConfig } from 'src/app/interfaces/app-config';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
  // https://lucasarcuri.com/blog/angular-load-config-file-before-app-starts/

  static settings: AppConfig;

  constructor(private http: HttpClient) { }

  load() {
    const jsonFile = `../../assets/config/config.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      firstValueFrom(this.http.get(jsonFile)).then((response: any) => {
        ConfigService.settings = <AppConfig>response;
        resolve();
      }).catch((reason => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(reason)}`);
      }))
    });
  }
}
