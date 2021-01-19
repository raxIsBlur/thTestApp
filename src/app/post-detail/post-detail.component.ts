import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { IComment, IPost } from '../types';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postId: number = 0;
  post: IPost;
  comments: MatTableDataSource<IComment> = new MatTableDataSource<IComment>();
  displayedColumns: string[] = ['id', 'name', 'email', 'body'];

  name: string = '';
  email: string = '';
  content: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.postId = parseInt(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadPost(this.postId);
    this.loadComments(this.postId);

    this.comments.filterPredicate = this.getFilterPredicate();
  }

  loadPost(id: number) {
    this.dataService.getPost(id).subscribe(x => {
      this.post = x;
    });
  }

  loadComments(postId: number) {
    this.dataService.getPostComments(postId).subscribe(x => {
      this.comments = new MatTableDataSource(x);
      this.comments.filterPredicate = this.getFilterPredicate();
    });
  }

  getFilterPredicate() {
    return (row: IComment, filters: string) => {
      const filterArray = filters.split('$');
      const filterName = filterArray[0];
      const filterEmail = filterArray[1];
      const filterContent = filterArray[2];

      const matchFilter = [];

      const name = row.name;
      const email = row.email;
      const content = row.body;

      matchFilter.push(name.toLowerCase().includes(filterName));
      matchFilter.push(email.toLowerCase().includes(filterEmail));
      matchFilter.push(content.toLowerCase().includes(filterContent));

      return matchFilter.every(Boolean);
    };
  }

  onFilterChange($event: any, type: string) {
    switch(type) {
      case 'name': 
        this.name = $event.target.value || '';
      break;
      case 'email': 
        this.email = $event.target.value || '';
      break;
      case 'content': 
        this.content = $event.target.value || '';
      break;
    }

    const filterValue = this.name + '$' + this.email + '$' + this.content;
    this.comments.filter = filterValue.trim().toLowerCase();
  }
}
