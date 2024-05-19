import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Song } from '../interfaces/song';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class LoadMusicService {
  constructor(private http: HttpClient) {}

  loadMusic(): Observable<Song[]> {
    const musicUrl = '../../assets/music-list.json';

    return this.http.get<Song[]>(musicUrl).pipe(
      catchError((): Observable<Song[]> => {
        console.error('Failed to load music data.');
        return of<Song[]>([]);
      })
    );
  }
}
