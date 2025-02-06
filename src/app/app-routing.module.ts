import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExemploComponent } from './components/exemplo/exemplo.component';

const routes: Routes = [{ path: 'exemplo', component: ExemploComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
