import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment, CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() carId!: number;

  comments: Comment[] = [];
  newComment: string = '';
  replyMap: { [key: number]: string } = {};
  replyBoxVisible: { [key: number]: boolean } = {};

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.carId).subscribe((data) => {
      this.comments = data.filter((c) => !c.parent);
    });
  }

  toggleReplyBox(commentId: number) {
    this.replyBoxVisible[commentId] = !this.replyBoxVisible[commentId];
  }

  postComment(parentId?: number) {
    const content = parentId ? this.replyMap[parentId] : this.newComment;
    if (!content?.trim()) return;

    this.commentService.addComment(this.carId, content, parentId).subscribe(() => {
      if (parentId) this.replyMap[parentId] = '';
      else this.newComment = '';
      this.loadComments();
    });
  }
}
