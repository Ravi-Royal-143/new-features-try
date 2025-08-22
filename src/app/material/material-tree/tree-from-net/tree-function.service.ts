import { Injectable } from '@angular/core';

import { TreeData } from './tree-from.net';

@Injectable({
  providedIn: 'root',
})
export class TreeFunctionService {
  flatJsonArray(flattenedAray: TreeData[], node: TreeData[]): TreeData[] {
    const array: TreeData[] = flattenedAray;
    for (const element of node) {
      array.push(element);
      if (element.Children.length > 0) {
        this.flatJsonArray(array, element.Children);
      }
    }
    return array;
  }

  findNodeMaxId(node: TreeData[]): number {
    const flatArray = this.flatJsonArray([], node);
    const ids: number[] = [];
    for (const element of flatArray) {
      ids.push(element.Id);
    }
    return ids.length ? Math.max(...ids) : 0;
  }

  findPosition(id: number, data: TreeData[]): number | null {
    for (let i = 0; i < data.length; i += 1) {
      if (id === data[i].Id) {
        return i;
      }
    }
    return null;
  }

  findFatherNode(id: number, data: TreeData[]): readonly [TreeData, number] | false {
    for (const currentFather of data) {
      for (let z = 0; z < currentFather.Children.length; z += 1) {
        if (id === currentFather.Children[z].Id) {
          return [currentFather, z] as const;
        }
      }
      for (const currentFatherChild of currentFather.Children) {
        if (id !== currentFatherChild.Id) {
          const result = this.findFatherNode(id, currentFather.Children);
          if (result !== false) {
            return result;
          }
        }
      }
    }
    return false;
  }
}
