import { Routes } from "@angular/router";
import { SignalComponent } from "./signal.component";
import { BasicSignalComponent } from "./basic-signal/basic-signal.component";
import { SignalObservableComponent } from "./signal-observable/signal-observable.component";

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
        {
            path: 'signal-observable',
            component: SignalObservableComponent
        }
    ]
}];