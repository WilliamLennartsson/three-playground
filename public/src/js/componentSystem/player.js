import Component from './components/component.js'
import SkinInstance from './components/skinInstance.js'

export default class Player extends Component {
  constructor(gameObject, model) {
    super(gameObject);
    this.skinInstance = gameObject.addComponent(SkinInstance, model);
    this.skinInstance.setAnimation('Survey');
  }
}