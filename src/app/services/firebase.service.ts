import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService{
    
    firestore: Firestore = inject(Firestore)

    constructor(){}
  
    getCollectionChanges<tipo>(path: string) {
      const itemCollection = collection(this.firestore, path);
      return collectionData(itemCollection) as Observable<tipo[]>;
    }
  
}
  