import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'miscompras',
    loadChildren: () => import('./miscompras/miscompras.module').then( m => m.MiscomprasPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'direccionderetiro',
    loadChildren: () => import('./direccionderetiro/direccionderetiro.module').then( m => m.DireccionderetiroPageModule)
  },
  {
    path: 'misgananciasdeafiliado',
    loadChildren: () => import('./misgananciasdeafiliado/misgananciasdeafiliado.module').then( m => m.MisgananciasdeafiliadoPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'guia',
    loadChildren: () => import('./guia/guia.module').then( m => m.GuiaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
