import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyB0JJK_mbdNkvQHPH-qj-nZp0AnV8YZjj0",
      authDomain: "registrapp-8cb8c.firebaseapp.com", 
      projectId: "registrapp-8cb8c",
      storageBucket: "registrapp-8cb8c.appspot.com",
      messagingSenderId: "1039519687148",
      appId: "1:1039519687148:web:948f179a3937d4328660c9",
      measurementId: "G-XDRCLB7SVZ"
    };

    const firebaseApp = initializeApp(firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }

}
