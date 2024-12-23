import { NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { FoodNode, TREE_DATA } from './mat.tree';

@Component({
    selector: 'app-mat-tree-parent-mine-custom',
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

  findParent(nodes: FoodNode[], searchId: string, parentNode: FoodNode | FoodNode[]): FoodNode[] | null | undefined {
    for (const node of nodes) {
      if (node.id === searchId) {
        return Array.isArray(parentNode) ? parentNode : parentNode.children
      }
      if (node.children?.length) {
        const parentNodeDetail = this.findParent(node.children, searchId, node)
        if (parentNodeDetail) {
          return parentNodeDetail
        }
      }
    }
    return null
  }

  createNodeToChildren(nodeArr: FoodNode[] | undefined | null, node: FoodNode | null = null) {
    const newData = {
      name: `string ${Math.random()}`,
      id: Math.random().toString()
    }
    if (nodeArr) {
      nodeArr.push(newData)
    } else {
      nodeArr = [newData]
    }
    this.refreshTreeData()
    if (node) {
      this.treeControl.expand(node)
    }
  }

  createChildNode(node: FoodNode) {
    if (!node.children) {
      node.children = []
    }
    this.createNodeToChildren(node.children, node)
  }

  createSibilingNode(node: FoodNode) {
    const treeData = this.dataSource.data
    const parentData = this.findParent(treeData, node.id, treeData)
    if (parentData) {
      this.createNodeToChildren(parentData)
    }
  }

  deleteNode(node: FoodNode) {
    const treeData = this.dataSource.data
    const parentData = this.findParent(treeData, node.id, treeData)
    if (parentData) {
      const indexPos = parentData.findIndex((data) => data.id === node.id)
      parentData.splice(indexPos, 1)
      // parentData = [...parentData?.filter((data) => data.id !== node.id)] // not works because we need to change the original reference of array
    }
    this.refreshTreeData()
  }

}
