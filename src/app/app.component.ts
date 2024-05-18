// app.component.ts
import { Component } from '@angular/core';
import { GithubApiService } from './github-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userRepositories: any[] = [];
  currentPage = 1;
  pageSize = 10;
  username = '';

  constructor(private githubApiService: GithubApiService) {}

  onSearch({ username, pageSize }: { username: string, pageSize: number }) {
    this.username = username;
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.fetchRepositories();
  }

  fetchRepositories() {
    this.githubApiService.getUserRepositories(this.username, this.currentPage, this.pageSize)
      .subscribe(repos => {
        this.userRepositories = repos;
      });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepositories();
    }
  }

  nextPage() {
    this.currentPage++;
    this.fetchRepositories();
  }
}
