import { BehaviorSubject } from "rxjs";

export const isComp1 = new BehaviorSubject(false);

export function toggleComp1() {
    isComp1.next(!isComp1.value);
}