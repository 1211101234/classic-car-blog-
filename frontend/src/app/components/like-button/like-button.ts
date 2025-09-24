import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-like-button',
  standalone: true,          // <--- make it standalone
  imports: [CommonModule],   // <--- import CommonModule
  templateUrl: './like-button.html',
  styleUrls: ['./like-button.scss']
})
export class LikeButtonComponent implements OnInit {
  @Input() carId!: number;
  @Input() initialLiked = false;
  @Input() initialCount = 0;

  liked = false;
  likeCount = 0;
  loading = false;

  constructor(private likeService: LikeService) {}

  ngOnInit(): void {
    this.liked = this.initialLiked;
    this.likeCount = this.initialCount;
  }

  toggleLike() {
    if (this.loading) return;
    this.loading = true;

    const prevLiked = this.liked;
    const prevCount = this.likeCount;

    this.liked = !prevLiked;
    this.likeCount = prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1;

    this.likeService.toggleLike(this.carId).subscribe({
      next: (res) => {
        this.liked = res.liked;
        this.likeCount = res.like_count;
        this.loading = false;
      },
      error: () => {
        this.liked = prevLiked;
        this.likeCount = prevCount;
        this.loading = false;
        alert('Could not update like. Try again.');
      }
    });
  }
}
