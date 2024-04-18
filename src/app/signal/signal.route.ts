import { Routes } from "@angular/router";
import { SignalComponent } from "./signal.component";
import { BasicSignalComponent } from "./basic-signal/basic-signal.component";

export const SIGNAL_ROUTES: Routes = [{
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: SignalComponent,
        },
        {
            path: 'basic-signal',
            component: BasicSignalComponent
        },
    ]
}];