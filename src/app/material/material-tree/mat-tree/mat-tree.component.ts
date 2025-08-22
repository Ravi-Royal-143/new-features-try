import { NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { FoodNode, TREE_DATA } from './mat-tree';

@Component({
  selector: 'app-mat-tree',
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './mat-tree.component.html',
  styleUrls: ['./mat-tree.component.scss'],
})
export class MatTreeComponent {
  @ViewChild(MatTree) tree: MatTree<FoodNode>;
  treeControl = new NestedTreeControl<FoodNode>((node: FoodNode) => node.children ?? []);
  dataSource: MatTreeNestedDataSource<FoodNode> = new MatTreeNestedDataSource<FoodNode>();
  showTree = true;

  constructor() {
    const treeData = this.recursiveNode(TREE_DATA);
    console.log(treeData);
    this.dataSource.data = treeData;
    this.treeControl.dataNodes = treeData;
  }

  toggleTree() {
    this.showTree = !this.showTree;
  }

  recursiveNode(nodes: FoodNode[]): FoodNode[] {
    const res = [];
    for (const node of nodes) {
      res.push({
        ...node,
        edit: false,
        ...(node.children && { children: this.recursiveNode(node.children) }),
      });
    }
    return res;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  editNode(node: FoodNode) {
    console.log(node);
    node.edit = true;
  }

  // addNodes(nodeData: FoodNode) {
  //   nodeData.children?.push({
  //     name: '',
  //     edit: true
  //   })
  // }

  addNodeData(currentNode: FoodNode) {
    const newNode = {
      name: 'string',
      edit: true,
    };
    // if (currentNode.children) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    currentNode.children ? currentNode.children.push(newNode) : (currentNode.children = [newNode]);
    const newDataSource = new MatTreeNestedDataSource<FoodNode>();
    newDataSource.data = this.dataSource.data;
    this.dataSource = newDataSource;
    this.tree.renderNodeChanges(currentNode.children ?? []);
    // this.tree.insertNode(this.dataSource.data, this.dataSource.data.length -1)
    this.treeControl.expand(currentNode);
    // }
  }

  // toggleNode(node: FoodNode) {
  //   this.treeControl.toggle(node);
  // }

  // renderChanges() {
  //   let data = this.dataSource.data;
  //   (this.dataSource as any).data = null;
  //   this.dataSource.data = data;

  // }

  // addNode(data: FoodNode, parentNode: FoodNode) {
  //   if (!parentNode.children) {
  //     parentNode.children = [];
  //   }
  //   parentNode.children.push(data);
  //   this.treeControl.expand(parentNode);
  // }

  saveNode(node: FoodNode) {
    node.edit = false;
  }

  print() {
    console.log(this);
  }
}
