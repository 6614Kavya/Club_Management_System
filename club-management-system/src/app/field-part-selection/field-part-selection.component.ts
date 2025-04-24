import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export class FieldPart {
  constructor(
    public name: string,
    // public row: number,
    // public top: number,
    // public left: number,
    // public width: number,
    // public height: number,
    public bitmask: number,
    public selected: boolean = false
  ) {}
}

@Component({
  selector: 'app-field-part-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- First Layout: Parts 1, 2, 3, 4 -->
    <!-- <div class="container">
      <div class="field-layout">
        <div
          *ngFor="let part of fieldPartsSet1"
          class="field-part"
          [class.selected]="part.selected"
          (click)="toggleSelection(part)"
        >
          {{ part.name }}
        </div>
      </div> -->

    <!-- Second Layout: Parts 1-2 and 3-4 -->
    <!-- <div class="field-layout">
        <div
          *ngFor="let part of fieldPartsSet2"
          class="field-part"
          [class.selected]="part.selected"
          [class.id-1-2]="part.id === '1-2'"
          [class.id-3-4]="part.id === '3-4'"
          (click)="toggleSelection(part)"
        >
          {{ part.name }}
        </div>
      </div> -->

    <!-- Third Layout: Part 1-4 -->
    <!-- <div class="field-layout">
        <div
          *ngFor="let part of fieldPartsSet3"
          class="field-part"
          [class.selected]="part.selected"
          [class.id-1-4]="part.id === '1-4'"
          (click)="toggleSelection(part)"
        >
          {{ part.name }}
        </div>
      </div>
    </div> -->

    <div class="field-container">
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[0].selected"
          (click)="toggleSelection(parts[0])"
        >
          {{ parts[0].name }}
        </div>
        <div
          class="field-part"
          [class.selected]="parts[1].selected"
          (click)="toggleSelection(parts[1])"
        >
          {{ parts[1].name }}
        </div>
      </div>
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[2].selected"
          (click)="toggleSelection(parts[2])"
        >
          {{ parts[2].name }}
        </div>
        <div
          class="field-part"
          [class.selected]="parts[3].selected"
          (click)="toggleSelection(parts[3])"
        >
          {{ parts[3].name }}
        </div>
      </div>
    </div>

    <!-- Optional: Combined parts below -->
    <div class="field-container" style="margin-top: 20px">
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[4].selected"
          (click)="toggleSelection(parts[4])"
        >
          {{ parts[4].name }}
        </div>
      </div>
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[5].selected"
          (click)="toggleSelection(parts[5])"
        >
          {{ parts[5].name }}
        </div>
      </div>
    </div>

    <!-- Full field row -->
    <div class="field-container" style="margin-top: 20px">
      <div class="field-column">
        <div
          class="field-part"
          [class.selected]="parts[6].selected"
          (click)="toggleSelection(parts[6])"
        >
          {{ parts[6].name }}
        </div>
      </div>
    </div>
  `,
  styleUrl: './field-part-selection.component.css',
})
export class FieldPartSelectionComponent {
  // fieldPartsSet1 = [
  //   { id: '1', name: '1', mask: 0b0001, selected: false },
  //   { id: '2', name: '2', mask: 0b0010, selected: false },
  //   { id: '3', name: '3', mask: 0b0100, selected: false },
  //   { id: '4', name: '4', mask: 0b1000, selected: false },
  // ];
  // fieldPartsSet2 = [
  //   { id: '1-2', name: '1-2', mask: 0b0011, selected: false },
  //   { id: '3-4', name: '3-4', mask: 0b1100, selected: false },
  // ];
  // fieldPartsSet3 = [{ id: '1-4', name: '1-4', mask: 0b1111, selected: false }];
  // toggleSelection(part: any) {
  //   part.selected = !part.selected;
  // }

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
    this.selectionChanged.emit(part.name);
    // Deselect all parts first
    this.parts.forEach((p) => (p.selected = false));

    // Select the clicked part
    part.selected = true;
    console.log('selected field part', part.bitmask);
  }
}
