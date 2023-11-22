import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPageRoutingModule } from './scan-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanPage } from './scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    ScanPageRoutingModule
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
