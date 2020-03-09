import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MiniUrl } from 'libs/interfaces/miniUrl';

@Injectable({
  providedIn: 'root'
})
export class MiniUrlService {
  constructor(
    private functions: AngularFireFunctions,
    private afs: AngularFirestore
  ) {}

  getRecentURLs(): Observable<MiniUrl[]> {
    return this.afs
      .collection<MiniUrl>('miniUrls', ref =>
        ref.limit(5).orderBy('dateCreated', 'desc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(tap(v => console.log(v)));
  }

  shortenURL(url: string): Observable<MiniUrl> {
    return this.functions.httpsCallable<{ longUrl: string }, MiniUrl>(
      'shortenUrl'
    )({ longUrl: url });
  }
}
