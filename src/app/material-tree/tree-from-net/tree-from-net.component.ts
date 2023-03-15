import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TreeData } from './tree-from.net';
import { of } from 'rxjs';
import { TreeDataService } from './tree-data.service';
import { TreeFunctionService } from './tree-function.service';

@Component({
  selector: 'app-tree-from-net',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './tree-from-net.component.html',
  styleUrls: ['./tree-from-net.component.scss']
})
export class TreeFromNetComponent {
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
      data => (this.nestedDataSource.data = data)
    );
  }

  private _getChildren = (node: TreeData) => of(node.Children);
  hasNestedChild = (_: number, nodeData: TreeData) => nodeData.Children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    (this.nestedDataSource as any).data = null;
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
    let elementPosition: any;
    nodeToBeEdited.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement[0]) {
      fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
    } else {
      elementPosition = this.service.findPosition(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
      this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
    }
    this.refreshTreeData();
  }

  deleteNode(nodeToBeDeleted: TreeData) {
    const deletedElement: any = this.service.findFatherNode(nodeToBeDeleted.Id, this.nestedDataSource.data);
    let elementPosition: any;
    if (window.confirm('Are you sure you want to delete ' + nodeToBeDeleted.Name + '?')) {
      if (deletedElement[0]) {
        deletedElement[0].Children.splice(deletedElement[1], 1);
      } else {
        elementPosition = this.service.findPosition(nodeToBeDeleted.Id, this.nestedDataSource.data);
        this.nestedDataSource.data.splice(elementPosition, 1);
      }
      this.refreshTreeData();
    }
  }
}
