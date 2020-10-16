import GameObject from './gameObject.js'
import SafeArray from './safeArray.js';

export default class GameObjectManager {
  constructor() {
    this.gameObjects = new SafeArray();
  }
  createGameObject(parent, name) {
    const gameObject = new GameObject(parent, name);
    this.gameObjects.add(gameObject);
    return gameObject;
  }
  removeGameObject(gameObject) {
    this.gameObjects.remove(gameObject);
  }
  update(delta) {
    this.gameObjects.forEach(gameObject => gameObject.update(delta));
  }
}