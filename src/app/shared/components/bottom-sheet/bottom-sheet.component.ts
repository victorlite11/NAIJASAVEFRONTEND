import { Component, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

export interface BottomSheetButton {
  name: string;
  bgColor?: string;
  onClick: ($ev ?: any) => any;
}

export interface BottomSheetData {
  heading: {
    text: string;
    color?: string;
  };
  description?: {
    text: string;
    color?: string;
    }
  footnote?: {
    text: string;
    color?: string;
  }
  buttons?: BottomSheetButton[];
}

export class BottomSheetSwitch {
  static ensue(bottomSheetContainer: any) {
    const sheet = bottomSheetContainer.sheet.nativeElement as HTMLElement
    sheet.classList.add('ensue');
    sheet.classList.remove('desue');
  }

  static desue(bottomSheetContainer: any) {
    const sheet = bottomSheetContainer.sheet.nativeElement as HTMLElement
    sheet.classList.add('desue', 'none');
    sheet.classList.remove('ensue');
  }
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  @Input() data: BottomSheetData = {heading: {text: "", color: "#55555"}}

  @ViewChild('sheet') sheet: any;

  constructor() { }

  ngOnInit(): void {
  }

  closeSheet() {
    this.desue()
  }

  private ensue() {
    (<HTMLElement>this.sheet.nativeElement).classList.remove('desue');
    (<HTMLElement>this.sheet.nativeElement).classList.add('ensue');
  }

  private desue() {
    (<HTMLElement>this.sheet.nativeElement).classList.remove('ensue');
    (<HTMLElement>this.sheet.nativeElement).classList.add('desue');
  }

}
