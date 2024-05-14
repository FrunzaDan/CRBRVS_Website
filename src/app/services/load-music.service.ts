import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root',
})
export class LoadMusicService {
  constructor(private http: HttpClient) {}

  loadMusic(): Observable<Song[]> {
    return this.http.get<Song[]>('../../assets/music-list.json');
  }
}
