import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
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
  selector: 'app-edit-node',
  standalone: true,
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css'],
})
export class EditNodeComponent {
  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() edittedNode = new EventEmitter<{ currentNode: TreeData; node: TreeData }>();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditNodeDialogComponent, {
      width: '250px',
      data: {
        Name: this.currentNode.Name,
        Description: this.currentNode.Description,
        Component: 'Edit',
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: { nodeName?: string; nodeDescription?: string } | undefined) => {
        if (result) {
          const node: TreeData = {
            Id: null,
            Name: result.nodeName ?? this.currentNode.Name,
            Description: result.nodeDescription ?? this.currentNode.Description,
            Children: this.currentNode.Children,
          };
          this.edittedNode.emit({ currentNode: this.currentNode, node: node });
        }
      });
  }
}

@Component({
  selector: 'app-edit-node-dialog',
  standalone: true,
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
export class EditNodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditNodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
