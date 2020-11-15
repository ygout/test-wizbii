import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [HttpClientModule]
})
export class CoreModule {
  construcor(@Optional() @SkipSelf() parentModule: CoreModule){
    if(parentModule) {
      throw new Error("Core module is already loaded ...");
    }
  }
}
