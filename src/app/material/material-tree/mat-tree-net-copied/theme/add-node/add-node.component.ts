import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf } from '@angular/common';
import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { TreeData, DialogData } from '../../../mat-tree-net-copied/service/tree-data.model';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css'],
  imports: [NgIf, MatButton],
})
export class AddNodeComponent {
  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() addedNode = new EventEmitter<TreeData>();
  @Output() addedNodeChild = new EventEmitter<{ currentNode: TreeData; node: TreeData }>();
  name: string;
  description: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewNodeDialogComponent, {
      width: '250px',
      data: { nodeName: this.name, nodeDescription: this.description, Component: 'Add' },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: { nodeName?: string; nodeDescription?: string } | undefined) => {
        if (result) {
          const node: TreeData = {
            Id: null,
            Name: result.nodeName ?? '',
            Description: result.nodeDescription ?? '',
            Children: [],
          };
          if (this.isTop) {
            this.addedNode.emit(node);
          } else {
            this.addedNodeChild.emit({ currentNode: this.currentNode, node });
          }
        }
      });
  }
}

@Component({
  selector: 'app-new-node',
  templateUrl: '../node-dialog/node-dialog.html',
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class NewNodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewNodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
