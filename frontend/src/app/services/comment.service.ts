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
  private apiUrl = 'http://localhost:8000/api'; // root API URL

  constructor(private http: HttpClient) {}

  // Create headers with Authorization token if available
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // --- Get all top-level comments for a car ---
  getComments(carId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/cars/${carId}/comments/`);
  }

  // --- Add a comment or reply ---
  addComment(carId: number, content: string, parentId?: number): Observable<Comment> {
    const body: any = { content };
    if (parentId) body.parent = parentId; // include parent for replies
    return this.http.post<Comment>(
      `${this.apiUrl}/cars/${carId}/comments/`,
      body,
      { headers: this.getAuthHeaders() }
    );
  }

  // --- Update a comment (owner only) ---
  updateComment(commentId: number, content: string): Observable<Comment> {
    return this.http.put<Comment>(
      `${this.apiUrl}/comments/${commentId}/`,
      { content },
      { headers: this.getAuthHeaders() }
    );
  }

  // --- Delete a comment (owner only) ---
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/comments/${commentId}/`,
      { headers: this.getAuthHeaders() }
    );
  }
}
