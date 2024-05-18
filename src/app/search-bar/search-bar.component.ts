// search-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  username: string = '';
  pageSize: number = 10;
  pageSizes: number[] = [10, 20, 30, 40, 50, 100];

  @Output() searchUser = new EventEmitter<{ username: string, pageSize: number }>();

  search() {
    this.searchUser.emit({ username: this.username, pageSize: this.pageSize });
  }

  onPageSizeChange() {
    this.searchUser.emit({ username: this.username, pageSize: this.pageSize });
  }
}



