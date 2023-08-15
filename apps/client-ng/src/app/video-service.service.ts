import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoListItem } from '@org/types';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private origin = 'http://localhost:3333/videos';
  constructor(private http: HttpClient) {}

  getVideos(folder: string) {
    const folderUpper = folder[0].toUpperCase() + folder.slice(1);
    const url = `${this.origin}?folder=${folderUpper}`;
    return this.http.get<{ files: VideoListItem[] }>(url).pipe(
      tap((_) => console.log('fetched videos')),
      catchError(
        this.handleError<{ files: VideoListItem[] }>('getHeroes', { files: [] })
      )
    );
  }

  getVideoSourceUrl(path: string) {
    return `${this.origin}/watch?path=${path}`;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
