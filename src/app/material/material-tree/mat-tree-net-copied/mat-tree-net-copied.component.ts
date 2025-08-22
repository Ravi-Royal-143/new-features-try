import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatNestedTreeNode,
  MatTree,
  MatTreeNestedDataSource,
  MatTreeNode,
  MatTreeNodeDef,
  MatTreeNodeOutlet,
  MatTreeNodeToggle,
} from '@angular/material/tree';
import { of as observableOf } from 'rxjs';

import { TreeData } from './service/tree-data.model';
import { TreeDataService } from './service/tree-data.service';
import { TreeFunctionService } from './service/tree-function.service';
import { AddNodeComponent } from './theme/add-node/add-node.component';
import { DeleteNodeComponent } from './theme/delete-node/delete-node.component';
import { EditNodeComponent } from './theme/edit-node/edit-node.component';

@Component({
  selector: 'app-mat-tree-net-copied',
  templateUrl: './mat-tree-net-copied.component.html',
  styleUrls: ['./mat-tree-net-copied.component.scss'],
  imports: [
    AddNodeComponent,
    MatTree,
    MatTreeNodeDef,
    MatTreeNode,
    MatIconButton,
    DeleteNodeComponent,
    EditNodeComponent,
    MatNestedTreeNode,
    MatTreeNodeToggle,
    MatIcon,
    MatTreeNodeOutlet,
  ],
})
export class MatTreeNetCopiedComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;

  constructor(
    private dataService: TreeDataService,
    private service: TreeFunctionService,
  ) {}

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe(
      (data: TreeData[]) => (this.nestedDataSource.data = data),
    );
  }

  private _getChildren = (node: TreeData): import('rxjs').Observable<TreeData[]> =>
    observableOf<TreeData[]>(node.Children);
  hasNestedChild = (_: number, nodeData: TreeData) => nodeData.Children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = [];
    this.nestedDataSource.data = data;
  }

  addNode(node: TreeData) {
    node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    this.nestedDataSource.data.push(node);
    this.refreshTreeData();
  }

  addChildNode(childrenNodeData: { currentNode: TreeData; node: TreeData }) {
    childrenNodeData.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    childrenNodeData.currentNode.Children.push(childrenNodeData.node);
    this.refreshTreeData();
  }

  editNode(nodeToBeEdited: { currentNode: TreeData; node: TreeData }) {
    const currentId = nodeToBeEdited.currentNode.Id;
    const fatherElement = this.service.findFatherNode(currentId, this.nestedDataSource.data);
    nodeToBeEdited.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement !== false) {
      const [parent, index] = fatherElement;
      parent.Children[index] = nodeToBeEdited.node;
    } else {
      const elementPosition = this.service.findPosition(currentId, this.nestedDataSource.data);
      if (elementPosition !== null && elementPosition !== -1) {
        this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
      }
    }
    this.refreshTreeData();
  }

  deleteNode(nodeToBeDeleted: TreeData) {
    const id = nodeToBeDeleted.Id;
    const deletedElement = this.service.findFatherNode(id, this.nestedDataSource.data);
    if (window.confirm(`Are you sure you want to delete ${String(nodeToBeDeleted.Name)}?`)) {
      if (deletedElement !== false) {
        const [parent, index] = deletedElement;
        parent.Children.splice(index, 1);
      } else {
        const elementPosition = this.service.findPosition(id, this.nestedDataSource.data);
        if (elementPosition !== null && elementPosition !== -1) {
          this.nestedDataSource.data.splice(elementPosition, 1);
        }
      }
      this.refreshTreeData();
    }
  }
}
