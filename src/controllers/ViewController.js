var Engine = boxer.core.Engine;
var Scene = boxer.core.Scene;
var DOMComponent = boxer.components.DOMComponent;

var ViewController = function(model, worker){
  this.scene = {
      addSubGraph: []
  }; // a model for a scene graph
  this.elements = {}; // a graph of elements;

  this.set(model);
  this.worker = worker;


  Engine.init(SceneWorker);

};

ViewController.prototype.set = function(model){
  var v = this;
  for( var i=0; i<model.length; i++ ){
    this.scene.addSubGraph.push(model[i]);
    this.elements['node-'+i] = new DOMComponent(model[i]);
  }

  this.worker.postMessage(v.scene); // send the model to the Scene Graph
};

ViewController.prototype.broadcast = function(msg){
  if(this.worker){
      this.worker.postMessage(msg);
  }

};

ViewController.prototype.receive = function(e) {
  console.log(e);
  if(e.data && e.data.message) {
    elements[e.data.node].elem.style[e.data.message.prop] = e.data.message.val;
  }

}
//
// module.exports = ViewController;
