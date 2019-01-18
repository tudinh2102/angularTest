import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '../app/user.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: []
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
      providers: [
        UserService
      ]
    };
  }
}
