import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private Http:HttpClient) { }

  getTopHeadLines(){
    return this.Http.get<RespuestaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0e0d7a993d1847bca41e6492cc825373')
  }
}
