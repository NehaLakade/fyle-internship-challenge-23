// repository-list.component.ts
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})
export class RepositoryListComponent implements OnChanges {
  @Input() repositories: any[] = [];
  @Input() pageSize: number = 10;
  @Output() previousPageEvent = new EventEmitter<void>();
  @Output() nextPageEvent = new EventEmitter<void>();

  currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repositories']) {
      this.updateDisplayedRepositories();
    }
  }

  updateDisplayedRepositories() {
    // Handle pagination logic if necessary
  }

  extractTechStack(repo: any): string[] {
    return repo.topics || [];
  }

  previousPage() {
    this.previousPageEvent.emit();
  }

  nextPage() {
    this.nextPageEvent.emit();
  }
}
