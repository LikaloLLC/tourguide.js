import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, TagsService, UserService } from '../core';

// TOURGUIDE
import Tourguide from "../../assets/tourguide.js/tourguide.esm.js";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }

  startTour() {

    console.log("in startTour()", Tourguide);
    var tourguide = new Tourguide({
      "id": "tourguideintro",
        "name": " TourGuide Introduction",
        "autorun": true,
      "steps": [
        {
          "selector": "[data-component=angular-conduit-intro]",
          "step": 1,
          "title": "Lets take a moment to get the look and feel of Tourguide.js",
          "content": "Click <kbd>&gt;</kbd> button to advance to the next step of this tour.<br/>To stop this tour at any time click <kbd>×</kbd> button in the top-right corner.",
          "image": ""
        },
        {
          "selector": "[data-component=your-feed]",
          "step": 2,
          "title": "This is 'Your Feed' block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=global-feed]",
          "step": 3,
          "title": "This is 'Global Feed' block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=article-list]",
          "step": 4,
          "title": "This is 'Article List' block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
        {
          "selector": "[data-component=popular-tags]",
          "step": 5,
          "title": "This is 'Popular Tags' block",
          "content": "You can define a JSON and let Tourguide define the flow of your application.",
          "image": ""
        },
      ]
    });
    tourguide.start();
  }

}
