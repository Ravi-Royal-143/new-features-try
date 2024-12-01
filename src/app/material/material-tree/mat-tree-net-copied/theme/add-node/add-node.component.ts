import { TreeData, DialogData } from '../../../mat-tree-net-copied/service/tree-data.model';
import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';



@Component({
    selector: 'app-add-node',
    templateUrl: './add-node.component.html',
    styleUrls: ['./add-node.component.css'],
    imports: [NgIf, MatButton]
})
export class AddNodeComponent {
  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() addedNode = new EventEmitter;
  name: string;
  description: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewNodeDialog, {
      width: '250px',
      data: {nodeName: this.name, nodeDescription: this.description, Component: 'Add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const node: TreeData = {
          Id: null,
          Name: result.nodeName,
          Description: result.nodeDescription,
          Children: []
        };
        if (this.isTop) {
          this.addedNode.emit(node);
        } else {
          this.addedNode.emit({currentNode: this.currentNode, node: node});
        }
      }
    });
  }
}

@Component({
    selector: 'app-new-node',
    templateUrl: '../node-dialog/node-dialog.html',
    imports: [CdkScrollable, MatDialogContent, MatFormField, MatInput, FormsModule, MatDialogActions, MatButton, MatDialogClose]
})
export class NewNodeDialog {

  constructor(
    public dialogRef: MatDialogRef<NewNodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
