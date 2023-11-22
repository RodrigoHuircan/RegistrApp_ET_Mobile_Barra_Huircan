import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QralumnoPageRoutingModule } from './qralumno-routing.module';

import { QralumnoPage } from './qralumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QralumnoPageRoutingModule
  ],
  declarations: [QralumnoPage]
})
export class QralumnoPageModule {}
