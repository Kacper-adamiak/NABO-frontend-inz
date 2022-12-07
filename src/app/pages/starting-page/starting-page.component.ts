import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {gsap} from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss'],
})
export class StartingPageComponent implements OnInit {

  constructor(

  ) { }

  @ViewChildren('apearOnScroll') apearOnScroll!: QueryList<ElementRef>;

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    setTimeout(() => {
      this.isAnimation();
    }, 100);
  }

  isAnimation(): void {
    let items = this.apearOnScroll.map((elem) => elem.nativeElement);
    items.forEach((box) => {
      const scrollBox = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          // pin: false,
          start: 'top 70%',
          end: 'bottom bottom',
          // markers: true,
          toggleActions: 'play none none reverse',
        },
      });
      scrollBox.from(box, { y: 0, x: 50, opacity: 0 });
    });
  }


}
