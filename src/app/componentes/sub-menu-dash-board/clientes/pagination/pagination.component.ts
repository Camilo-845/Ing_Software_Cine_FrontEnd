import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() handlePagination = new EventEmitter<number | 'prev' | 'next'>();

  Number(value: string | number): number {
    return Number(value);
  }

  handlePageChange(action: number | 'prev' | 'next'): void {
    if (action === 'prev' && this.currentPage > 1) {
      this.handlePagination.emit('prev');
    } else if (action === 'next' && this.currentPage < this.totalPages) {
      this.handlePagination.emit('next');
    } else if (typeof action === 'number') {
      this.handlePagination.emit(action);
    }
  }

  getPages(): Array<number> {
    const pages: Array<number> = [];

    pages.push(1);

    if (this.currentPage > 2) {
      pages.push(this.currentPage - 1);
    }

    if (!pages.includes(this.currentPage)) {
      pages.push(this.currentPage);
    }

    if (this.currentPage < this.totalPages - 1) {
      pages.push(this.currentPage + 1);
    }

    if (this.totalPages > 1 && !pages.includes(this.totalPages)) {
      pages.push(this.totalPages);
    }

    if (pages.length > 4) {
      pages.splice(1, pages.length - 4);
    }

    return pages;
  }
}
