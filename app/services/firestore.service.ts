import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  crearDoc(data: any, path: string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getCollection(){
    this.firestore.collection('Usuarios').valueChanges().subscribe((res) =>{

    });
  }

  getId(){
    return this.firestore.createId();
  }

  updateDoc(path: string, id: string, data: any){
    return this.firestore.collection(path).doc(id).update(data)
  }
}
