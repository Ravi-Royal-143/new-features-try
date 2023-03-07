import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FoodNode, TREE_DATA } from './mat-tree';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mat-tree',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './mat-tree.component.html',
  styleUrls: ['./mat-tree.component.scss']
})
export class MatTreeComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    const treeData = this.recursiveNode(TREE_DATA)
    console.log(treeData)
    this.dataSource.data = treeData;
  }

  recursiveNode(nodes: FoodNode[]): FoodNode[] {
    let res = []
    for(let node of nodes) {
      res.push({
        ...node,
        edit: false,
        ...node.children && { children: this.recursiveNode(node.children)}
      })
    }
    return res
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  editNode(node: any) {
    console.log(node)
    node.edit = true
  }

  addNode(data: FoodNode, parentNode: FoodNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(data);
    this.treeControl.expand(parentNode);
  }

  saveNode(node: FoodNode) {
    node.edit = false;
  }
}
