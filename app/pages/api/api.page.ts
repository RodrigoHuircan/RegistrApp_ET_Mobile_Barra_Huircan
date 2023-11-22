import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class APIPage implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService, private menuController: MenuController) {}

  ngOnInit(){
    this.noticiasService.getTopHeadLines().subscribe(resp =>
      {console.log('noticias', resp.articles);
      this.noticias.push(...resp.articles)
    }); 
  }

  alumnoMenu(){
    this.menuController.open('third');
  }
}
