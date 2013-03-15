

var Node = function(data){

	this.data = data;
	
	this.children = [];

	this.parent = null;
}
Node.prototype.init = function(){

	

}

Node.prototype.add = function(item){

	item.parent = this;

	this.children.push(item);

	return item;
}

Node.prototype.remove = function(item){

	item.parent = null;
	
	this.children.splice( this.children.indexOf(item), 1 );
}

//深度优先中序遍历
Node.prototype.traverse = function( callback ){

	callback && callback( this );

	this.children.forEach(function(node){

		node.traverse( callback );
	})
};


// test code
var root = new Node( "root" );
var child1 = root.add( new Node(">child1") );
child1.add( new Node(">>leaf1"));
var child2 = root.add( new Node('>child2') );
child2.add( new Node(">>leaf2"));

root.traverse( function(node){
	document.write(node.data+"<br />");
})