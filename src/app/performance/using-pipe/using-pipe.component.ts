import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelValue } from './using-pipe';
import { GetLabelPipe } from './get-label.pipe';

@Component({
    selector: 'app-using-pipe',
    imports: [CommonModule, GetLabelPipe],
    templateUrl: './using-pipe.component.html',
    styleUrls: ['./using-pipe.component.scss']
})
export class UsingPipeComponent {

  arrayDatas: LabelValue[] = []
  insideFun = 0;
  constructor() {
    this.arrayDatas = Array.from({ length: 500 }, (_, i) => this.objCreation(i))
  }

  getLabelLocalFn(data: LabelValue) {
    this.insideFun = this.insideFun + 1;
    return this.getLabel(data)
  }

  getLabel(data: LabelValue) {
    return data.label
  }

  test() { 
    console.log('test', this.insideFun)
    this.arrayDatas.push(this.objCreation(this.arrayDatas.length))
  }

  objCreation(index: number) {
    return {
      value: index + 1,
      label: `${index + 1}`
    }
  }
}
