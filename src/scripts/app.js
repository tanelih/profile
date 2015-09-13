import 'whatwg-fetch'
import 'babel/polyfill'

import deku    from 'deku'
import element from 'virtual-element'

import * as UserView from 'app/views/user'

let tree = deku.tree(
  <UserView name="tanelih" />
)

deku.render(tree, document.getElementById('app'))
