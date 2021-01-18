import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IComment, IPost, IUser } from './types';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  getPost(id: number) {
    return this.http.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  getPosts() {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getComment(id: number) {
    return this.http.get<IComment>(`https://jsonplaceholder.typicode.com/comments/${id}`);
  }

  getComments() {
    return this.http.get<IComment[]>('https://jsonplaceholder.typicode.com/comments');
  }

  getPostComments(postId: number) {
    return this.http.get<IComment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  }

  getUser(id: number) {
    return this.http.get<IUser>(`https://jsonplaceholder.typicode.com/users/${id}`);   
  }
  
  getUsers() {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');   
  }
}