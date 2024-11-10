import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '@interfaces/cliente';
import { ClienteService } from '@services/api/cliente.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css',
})
export class SearchModalComponent implements AfterViewChecked, OnDestroy {
  @Input() isActive!: boolean;
  @Output() handleSearch = new EventEmitter<Cliente[]>();
  @Output() onError = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();
  private clienteService = inject(ClienteService);
  private formBuilder = inject(FormBuilder);
  private subscriptions: any;
  public searchForm = this.formBuilder.group({
    search: ['', Validators.required],
  });

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  ngAfterViewChecked(): void {
    const searchBar = document.querySelector('.search-bar') as HTMLInputElement;

    if (searchBar) {
      searchBar.focus();
    }
  }

  handleSubmit(): void {
    const { search } = this.searchForm.value;
    if (search) {
      this.searchClientById(parseInt(search));
    }
  }

  private async searchClientById(id: number) {
    this.clienteService.getById(id).subscribe({
      next: (response) => {
        this.handleSearch.emit(response);
      },
      error: (error) => {
        this.onError.emit(error);
      },
      complete: () => {
        this.closeModal();
      },
    });
  }

  closeModal(): void {
    this.onClose.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const modalBox = document.querySelector('.modal-box');

    if (
      target.classList.contains('search-modal') &&
      modalBox &&
      !modalBox.contains(target)
    ) {
      this.closeModal();
    }
  }
}