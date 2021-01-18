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
  // displayedColumns: string[] = ['postId', 'id', 'name', 'email', 'body'];

  constructor(private route: ActivatedRoute, private dataService: DataService) { 
    console.log('route', route);
    this.postId = parseInt(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // this.post = {
    //   id: 1,
    //   userId: 1,
    //   title: 'asd',
    //   body: 'asdasdadasda',
    // }

    this.loadPost(this.postId);
    this.loadComments(this.postId);
  }

  loadPost(id: number) {
    this.dataService.getPost(id).subscribe(x => {
      this.post = x;
    });
  }

  loadComments(postId: number) {
    this.dataService.getPostComments(postId).subscribe(x => {
      this.comments = new MatTableDataSource(x);
    });
  }

}
