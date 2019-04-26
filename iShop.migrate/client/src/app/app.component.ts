import { ViewChild, Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ShopService } from './shop.service';
import { ClarityIcons } from '@clr/icons';
import { ClrShapeWand } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeTags } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeViewList } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeHelp } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeUsers } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeTools } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeItalic } from '@clr/icons/shapes/text-edit-shapes';
import { ClrShapeCog } from '@clr/icons/shapes/core-shapes';
import { ClrShapeLogin } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeLogout } from '@clr/icons/shapes/essential-shapes';
import { ClrShapeShoppingCart } from '@clr/icons/shapes/commerce-shapes';
import { ClrShapeStore } from '@clr/icons/shapes/commerce-shapes';
import { ClrShapeDollar } from '@clr/icons/shapes/commerce-shapes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iShop';

  constructor(public authService: AuthService) {}
}
