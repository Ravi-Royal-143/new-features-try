import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';

import { MatTreeCopiedModule } from './mat-tree-copied.routing';
import { MatTreeNetCopiedComponent } from './mat-tree-net-copied.component';
import { AddNodeComponent, NewNodeDialogComponent } from './theme/add-node/add-node.component';
import { DeleteNodeComponent } from './theme/delete-node/delete-node.component';
import { EditNodeComponent, EditNodeDialogComponent } from './theme/edit-node/edit-node.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatTreeCopiedModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTreeNetCopiedComponent,
    NewNodeDialogComponent,
    EditNodeComponent,
    EditNodeDialogComponent,
    DeleteNodeComponent,
    AddNodeComponent,
  ],
})
export class MatTreeNetCopiedModule {}
