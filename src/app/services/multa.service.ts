import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  constructor(private firestore: AngularFirestore) { }

  getMultas(): Observable<any>{
    return this.firestore.collection('multas').snapshotChanges();

  }
}
