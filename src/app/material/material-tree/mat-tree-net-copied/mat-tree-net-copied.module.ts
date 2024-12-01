import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeNetCopiedComponent } from './mat-tree-net-copied.component';
import { AddNodeComponent, NewNodeDialog } from './theme/add-node/add-node.component';
import { EditNodeComponent, EditNodeDialog } from './theme/edit-node/edit-node.component';
import { DeleteNodeComponent } from './theme/delete-node/delete-node.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeCopiedModule } from './mat-tree-copied.routing';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

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
        NewNodeDialog,
        EditNodeComponent,
        EditNodeDialog,
        DeleteNodeComponent,
        AddNodeComponent
    ]
})
export class MatTreeNetCopiedModule { }
