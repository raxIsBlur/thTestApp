import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { IPost } from '../types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  dataSource = new MatTableDataSource<IPost>();
  posts: Observable<IPost[]>;
  displayedColumns: string[] = ['id', 'title', 'body', 'action'];
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body', 'action'];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    // this.posts 
    this.dataService.getPosts().subscribe(x => {
      this.dataSource = new MatTableDataSource(x);
    });
  }

  goToPost(id: number) {
    this.router.navigate([`/posts/${id}`]);
  }

  
}
