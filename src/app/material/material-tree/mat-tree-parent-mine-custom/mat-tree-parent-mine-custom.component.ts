import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { FoodNode, TREE_DATA } from './mat.tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mat-tree-parent-mine-custom',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './mat-tree-parent-mine-custom.component.html',
  styleUrls: ['./mat-tree-parent-mine-custom.component.scss']
})
export class MatTreeParentMineCustomComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  refreshTreeData() {
    const data = this.dataSource.data
    this.dataSource.data = []
    this.dataSource.data = data
  }

  findParent(nodes: FoodNode[], searchId: string, parentNode: FoodNode): FoodNode | null {
    for(let node of nodes) {
      if(node.id === searchId) {
        return parentNode
      }
      if(node.children?.length) {
        const parentNodeDetail = this.findParent(node.children, searchId, node)
        if(parentNodeDetail) {
          return parentNodeDetail
        }
      }
    }
    return null
  }

  createChildNode(node: FoodNode) {
    const newData = {
      name: 'string',
      id: Math.random().toString()
    }
    if(node.children) {
      node.children.push(newData)
    } else {
      node.children = [newData]
    }
    this.refreshTreeData()
    this.treeControl.expand(node)
  }

  createSibilingNode(node: FoodNode) {
    const treeData = this.dataSource.data
    const parentData = this.findParent(treeData, node.id, treeData[0])
    if(parentData) {
      this.createChildNode(parentData)
    } 
  }

  deleteNode(node: FoodNode) {
    const treeData = this.dataSource.data
    const parentData = this.findParent(treeData, node.id, treeData[0])
    if(parentData) {
      parentData.children = parentData.children?.filter((data) => data.id !== node.id)
    }
    this.refreshTreeData()
  }

}
