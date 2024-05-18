import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserRepositories(username: string, page: number, perPage: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos`, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching repositories', error);
          return throwError(error);
        }),
        switchMap((repos: any[]) => {
          const topicsRequests = repos.map(repo => 
            this.http.get<{ names: string[] }[]>(`${this.apiUrl}/repos/${username}/${repo.name}/topics`, {
              headers: { 'Accept': 'application/vnd.github.mercy-preview+json' }
            }).pipe(
              catchError(error => {
                console.error('Error fetching topics', error);
                return throwError(error);
              }),
              map((topicsResponse: { names: string[] }[]) => { // Adjusted type annotation here
                if (topicsResponse && topicsResponse[0] && topicsResponse[0].names) { // Check if topicsResponse[0] and topicsResponse[0].names are defined
                  repo.topics = topicsResponse[0].names;
                } else {
                  repo.topics = []; // Set an empty array as default value if names property is undefined
                }
                return repo;
              })
            )
          );
          return forkJoin(topicsRequests);
        })
      );
  }
}
