import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  mainNav: HTMLElement | null | undefined;
  toggleMenuIcon: HTMLElement | null | undefined;

  ngAfterViewInit() {
     this.mainNav = document.getElementById("main-nav");
     this.toggleMenuIcon = document.getElementById("toggle-menu-icon");
  }

  // toggleMenu() {
  //    if (this.mainNav && this.toggleMenuIcon) {
  //       this.mainNav.classList.toggle('hidden');

  //       this.toggleMenuIcon.classList.toggle('fa-bars');
  //       this.toggleMenuIcon.classList.toggle('fa-times');
  //    }
  // }
}

