import { NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';

import { TreeDataService } from './tree-data.service';
import { TreeData } from './tree-from.net';
import { TreeFunctionService } from './tree-function.service';

@Component({
  selector: 'app-tree-from-net',
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tree-from-net.component.html',
  styleUrls: ['./tree-from-net.component.scss'],
})
export class TreeFromNetComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;

  constructor(
    private dataService: TreeDataService,
    private service: TreeFunctionService,
  ) {}

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.nestedTreeControl = new NestedTreeControl<TreeData>((node: TreeData) => node.Children);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe((data) => (this.nestedDataSource.data = data));
  }

  private _getChildren = (node: TreeData) => of<TreeData[]>(node.Children);
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
    const fatherElement = this.service.findFatherNode(
      nodeToBeEdited.currentNode.Id,
      this.nestedDataSource.data,
    );
    let elementPosition: number | null;
    nodeToBeEdited.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement !== false) {
      const [parent, index] = fatherElement;
      parent.Children[index] = nodeToBeEdited.node;
    } else {
      elementPosition = this.service.findPosition(
        nodeToBeEdited.currentNode.Id,
        this.nestedDataSource.data,
      );
      if (elementPosition !== null && elementPosition !== -1) {
        this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
      }
    }
    this.refreshTreeData();
  }

  deleteNode(nodeToBeDeleted: TreeData) {
    const deletedElement = this.service.findFatherNode(
      nodeToBeDeleted.Id,
      this.nestedDataSource.data,
    );
    let elementPosition: number | null;
    if (window.confirm('Are you sure you want to delete ' + nodeToBeDeleted.Name + '?')) {
      if (deletedElement !== false) {
        const [parent, index] = deletedElement;
        parent.Children.splice(index, 1);
      } else {
        elementPosition = this.service.findPosition(nodeToBeDeleted.Id, this.nestedDataSource.data);
        if (elementPosition !== null && elementPosition !== -1) {
          this.nestedDataSource.data.splice(elementPosition, 1);
        }
      }
      this.refreshTreeData();
    }
  }
}
