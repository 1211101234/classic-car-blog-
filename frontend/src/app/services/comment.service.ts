import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Comment interface
export interface Comment {
  id: number;
  car: number;
  user: string;
  parent?: number;
  content: string;
  created_at: string;
  updated_at: string;
  replies: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api/cars'; // base URL
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Get all top-level comments for a car
  getComments(carId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${carId}/comments/`);
  }

  // Add a comment or reply
  addComment(carId: number, content: string, parentId?: number): Observable<Comment> {
    const body: any = { content };
    if (parentId) body.parent = parentId; // parent ID for replies
    return this.http.post<Comment>(`${this.apiUrl}/${carId}/comments/`, body, { headers: this.jsonHeaders });
  }

  // Update a comment
  updateComment(commentId: number, content: string): Observable<Comment> {
    return this.http.put<Comment>(`http://localhost:8000/api/comments/${commentId}/`, { content }, { headers: this.jsonHeaders });
  }

  // Delete a comment
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/comments/${commentId}/`);
  }
}
