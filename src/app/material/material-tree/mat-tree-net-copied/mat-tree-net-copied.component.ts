import { TreeFunctionService } from './service/tree-function.service';
import { TreeDataService } from './service/tree-data.service';
import { TreeData } from './service/tree-data.model';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource, MatTree, MatTreeNodeDef, MatTreeNode, MatNestedTreeNode, MatTreeNodeToggle, MatTreeNodeOutlet } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddNodeComponent } from './theme/add-node/add-node.component';
import { MatIconButton } from '@angular/material/button';
import { DeleteNodeComponent } from './theme/delete-node/delete-node.component';
import { EditNodeComponent } from './theme/edit-node/edit-node.component';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-mat-tree-net-copied',
    templateUrl: './mat-tree-net-copied.component.html',
    styleUrls: ['./mat-tree-net-copied.component.scss'],
    imports: [AddNodeComponent, MatTree, MatTreeNodeDef, MatTreeNode, MatIconButton, DeleteNodeComponent, EditNodeComponent, MatNestedTreeNode, MatTreeNodeToggle, MatIcon, MatTreeNodeOutlet]
})
export class MatTreeNetCopiedComponent {
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;

  constructor(
    private dataService: TreeDataService,
    private service: TreeFunctionService
  ) { }

  ngOnInit() {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe(
      (data: any) => (this.nestedDataSource.data = data)
    );
  }

  private _getChildren = (node: TreeData) => observableOf(node.Children);
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

  addChildNode(childrenNodeData: any) {
    childrenNodeData.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    childrenNodeData.currentNode.Children.push(childrenNodeData.node);
    this.refreshTreeData();
  }



  editNode(nodeToBeEdited: any) {
    const fatherElement: any = this.service.findFatherNode(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
    let elementPosition: number;
    nodeToBeEdited.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement[0]) {
      fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
    } else {
      elementPosition = this.service.findPosition(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data)!;
      this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
    }
    this.refreshTreeData();
  }



  deleteNode(nodeToBeDeleted: any) {
    const deletedElement: any = this.service.findFatherNode(nodeToBeDeleted.Id, this.nestedDataSource.data);
    let elementPosition: number;
    if (window.confirm('Are you sure you want to delete ' + nodeToBeDeleted.Name + '?')) {
      if (deletedElement[0]) {
        deletedElement[0].Children.splice(deletedElement[1], 1);
      } else {
        elementPosition = this.service.findPosition(nodeToBeDeleted.Id, this.nestedDataSource.data)!;
        this.nestedDataSource.data.splice(elementPosition, 1);
      }
      this.refreshTreeData();
    }
  }

}
