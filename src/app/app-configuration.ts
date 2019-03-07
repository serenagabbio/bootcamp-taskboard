import { InjectionToken, ValueProvider } from '@angular/core';
import { environment } from '../environments/environment';

export const APP_CONFIG = new InjectionToken('app-config');

export const provideAppConfig: ValueProvider = {
   provide: APP_CONFIG,
   useValue: environment
};

export interface AppConfiguration {
   apiTasksUrl: string;
}