import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[dropFile]'
})
export class DropFileDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop',['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }
  @HostListener('dragover',['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }
  @HostListener('dragleave',['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }


}
