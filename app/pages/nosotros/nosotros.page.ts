import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  alumnoMenu(){
    this.menuController.open('third');
  }

}
