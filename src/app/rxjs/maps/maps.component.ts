import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { concatMap, exhaustMap, filter, interval, mergeMap, Observable, Subscription, switchMap, take } from 'rxjs';

interface PostRes {
  id: string;
  body: string;
  title: string;
  userId: string;
}

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {

  tableDatas: PostRes[] = []
  sub$:Subscription;
  details = {
    title: '',
    body: ''
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.mergeMapFn()
  }

  fetchDetails(mapType = mergeMap) {
    if(this.sub$ && !this.sub$.closed) {
      this.sub$.unsubscribe()
    }
    this.tableDatas = []
    let postlds = interval(1).pipe(
      filter(val => val > 0),
      take(100)
    )
    this.sub$ = postlds
      .pipe(
        mapType((id) => {
          return this.http.get<PostRes>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        })
      ).subscribe((resposne: PostRes) => {
        console.log(resposne);
        this.tableDatas.push(resposne)
      })
  }

  mergeMapFn() {
    this.details = {
      title: 'Merge Map',
      body: 'Executes in order but the subscription will takes which one comes first (not in the order of which it values came to it).  so the values inside subscription is not the last one which is subscribed, the one which comes last'
    }
    this.fetchDetails(mergeMap)
  }

  switchMapFn() {
    this.details = {
      title: 'Switch Map',
      body: 'cancels all previous subscription and hold the last once '
    }
    this.fetchDetails(switchMap)
  }

  concatMapFn() {
    this.details = {
      title: 'Concat Map',
      body: 'All values will be executed one by one, if one ends then only next value will starts(in order). None of the  values will be ignored. '
    }
    this.fetchDetails(concatMap)
  }

  exhaustMap() {
    this.details = {
      title: 'Exhaust Map',
      body: 'all the upcoming values will be ignored till the current subscription ends, if the current sub ends then next one which is in queue will be executed(inbetween values will be ignored)'
    } 
    this.fetchDetails(exhaustMap)
  }
}
