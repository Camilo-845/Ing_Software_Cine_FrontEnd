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
    if (this.currentPage === action) return;

    if (action === 'prev' && this.currentPage > 1) {
      this.handlePagination.emit('prev');
    } else if (action === 'next' && this.currentPage < this.totalPages) {
      this.handlePagination.emit('next');
    } else if (typeof action === 'number') {
      this.handlePagination.emit(action);
    }
  }

  handleEditPage(): void {
    const page = prompt('Enter page number:');
    const pageNumber = Number(page);

    if (
      !isNaN(pageNumber) &&
      Number.isInteger(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= this.totalPages
    )
      this.handlePagination.emit(pageNumber);
  }

  getPages(): Array<number> {
    const pages: Array<number> = [1];

    if (this.currentPage == 1 && this.totalPages > 2) {
      pages.push(2);
    }

    if (!pages.includes(this.currentPage)) {
      pages.push(this.currentPage);
    }

    if (this.currentPage == this.totalPages && this.totalPages > 2) {
      pages.pop();
      pages.push(this.totalPages - 1);
      pages.push(this.totalPages);
    }

    if (this.totalPages > 1 && !pages.includes(this.totalPages)) {
      pages.push(this.totalPages);
    }

    return pages;
  }
}
