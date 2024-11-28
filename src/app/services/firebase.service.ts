import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData, deleteDoc, doc,docData, setDoc, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import {v4 as uuidv4} from 'uuid';

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

    createDocument(data: any, enlace: string ) {
      const document = doc(this.firestore, enlace );
      return setDoc(document, data)
    }

    createDocumentID(data: any, enlace: string, idDoc: string){
      const document = doc(this.firestore, `${enlace}/${idDoc}` );
      return setDoc(document, data)
    }

    createId(){
      let myuuid = uuidv4();
      return  myuuid;
      
    }
    
    getDocument<tipo>(collectionName: string, id: string): Observable<tipo | undefined> {
      const documentReference = doc(this.firestore, `${collectionName}/${id}`);
      return docData(documentReference, { idField: 'id' }) as Observable<tipo | undefined>;
    }
    
    
    updateDocument(data: any, enlace: string, idDoc: string){
        const document = doc(this.firestore, `${enlace}/${idDoc}` );
        return setDoc(document, data)
      
    }

    deleteDocument(enlace: string, idDoc: string){
      const document = doc(this.firestore, `${enlace}/${idDoc}`);
      return deleteDoc(document)
    }

    updateVistoEstado(inscripcionId: string, visto: boolean) {
      const inscripcionRef = doc(this.firestore, `viajesIns/${inscripcionId}`);
      return updateDoc(inscripcionRef, {visto: visto});
    }
    
}
  