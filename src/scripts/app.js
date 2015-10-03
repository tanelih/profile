import 'whatwg-fetch'
import 'babel/polyfill'

import deku    from 'deku'
import element from 'virtual-element'

import * as UserView from 'app/views/user'

deku.render(
  deku.tree(<UserView name="tanelih" />), document.getElementById('app'))
