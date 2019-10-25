import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tt } from '../Modeles/test';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {

  myId = null;
  myhome = null;
  myArticle;

  constructor(private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.myhome = tt;
    this.myArticle = tt[this.myId ];
  }

}
