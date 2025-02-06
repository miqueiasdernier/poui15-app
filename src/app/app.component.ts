import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  PoDialogService,
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import {
  ProAppConfigService,
  ProJsToAdvplService,
} from '@totvs/protheus-lib-core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuItemSelected: string = '';

  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: (menu: PoMenuItem) => {
        this.printMenuAction(menu);
        this.router.navigate(['/']);
      },
      icon: 'po-icon po-icon-home',
      shortLabel: 'Home',
    },
    {
      label: 'Exemplo',
      action: (menu: PoMenuItem) => {
        this.printMenuAction(menu);
        this.router.navigate(['/exemplo']);
      },
      icon: 'po-icon po-icon-user',
      shortLabel: 'TESTE',
    },
    {
      label: 'Fechar',
      action: this.closeApp.bind(this),
      icon: 'po-icon po-icon-close',
      shortLabel: 'Fechar',
    },
  ];

  constructor(
    private proAppConfigService: ProAppConfigService,
    private router: Router,
    private podialogService: PoDialogService
  ) {}

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  closeApp() {
    if (this.proAppConfigService.insideProtheus())
      this.podialogService.confirm({
        title: 'Fechar aplicação',
        message: 'Deseja realmente fechar a aplicação?',
        confirm: () => {
          this.proAppConfigService.callAppClose(true);
        },
      });
    else
      this.podialogService.alert({
        title: 'Fechar aplicação',
        message: 'Não é possível fechar a aplicação fora do Protheus.',
      });
  }
}
