import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export class FieldPart {
  constructor(
    public id: string,
    public name: string,
    // public row: number,
    // public top: number,
    // public left: number,
    // public width: number,
    // public height: number,
    public bitmask: any | undefined,
    public isBooked: boolean | undefined
  ) {}
}

@Component({
  selector: 'app-field-part-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="field-container">
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[0]?.isBooked"
          (click)="toggleSelection(parts[0])"
        >
          {{ parts[0]?.bitmask }}
        </div>
        <div
          class="field-part"
          [class.selected]="parts[1]?.isBooked"
          (click)="toggleSelection(parts[1])"
        >
          {{ parts[1]?.bitmask }}
        </div>
      </div>
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[2]?.isBooked"
          (click)="toggleSelection(parts[2])"
        >
          {{ parts[2]?.bitmask }}
        </div>
        <div
          class="field-part"
          [class.selected]="parts[3]?.isBooked"
          (click)="toggleSelection(parts[3])"
        >
          {{ parts[3]?.bitmask }}
        </div>
      </div>
    </div>

    <!-- Optional: Combined parts below -->
    <div class="field-container" style="margin-top: 20px">
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[4]?.isBooked"
          (click)="toggleSelection(parts[4])"
        >
          {{ parts[4]?.bitmask }}
        </div>
      </div>
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[5]?.isBooked"
          (click)="toggleSelection(parts[5])"
        >
          {{ parts[5]?.bitmask }}
        </div>
      </div>
    </div>

    <!-- Full field row -->
    <div class="field-container" style="margin-top: 20px">
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[6]?.isBooked"
          (click)="toggleSelection(parts[6])"
        >
          {{ parts[6]?.bitmask }}
        </div>
      </div>
    </div>
  `,
  styleUrl: './field-part-selection.component.css',
})
export class FieldPartSelectionComponent {
  @Input() parts: FieldPart[] = [];
  @Input() initialSelectionMask = 0;
  @Output() selectionChanged = new EventEmitter<string>();

  selectedMask = 0;

  ngOnInit() {
    this.selectedMask = this.initialSelectionMask;
  }

  // isSelected(part: FieldPart): boolean {
  //   return (this.selectedMask & part.bitmask) === part.bitmask;
  // }

  toggleSelection(part: FieldPart): void {
    // if (this.isSelected(part)) {
    //   this.selectedMask &= ~part.bitmask; //to deselect
    // } else {
    //   this.selectedMask |= part.bitmask; //to select
    // }

    // console.log(
    //   'selected mask',
    //   this.selectedMask.toString(2).padStart(4, '0')
    // );
    this.selectionChanged.emit(part.id);
    // Deselect all parts first
    this.parts.forEach((p) => (p.isBooked = false));

    // Select the clicked part
    part.isBooked = true;
    console.log('selected field part', part.bitmask);
  }
}
