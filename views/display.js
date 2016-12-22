// variables in html

var map = document.getElementById("map");
var item_area = document.getElementById("item");
var craft_area = document.getElementById("craft");
var new_area = document.getElementById("new");
var carry_area = document.getElementById("carry");

// variables in database

// PLAYER
var Name;
var Skin;
var Hunger;
var Temp;
var Endurance;   // hunger
var Resistance;  // cold
var LV;
var EXP;

// OBJECTS
var land_type; // 0 >> ocean, 1 >> land
var tree_image; //url
var tree_type; // 0 >> no tree, 99 >> people
var ID;
var seqnum;
var HP;

// ITEMS
var Item_image; //url
var Item_name; // id
var Item_type; // material, food, tool
var Stacks;  // how many of it

// LOCATION 

var ply_xpos; // player position in tree_map array
var ply_ypos;

var mp_xpos;
var mp_ypos;

var map_size; // how many blocks
var block_size; // pixels

var screen_height; // both in how many blocks you want to show
var screen_length;

var item_height = 3;
var item_length = 9;

var craft_height = 3;
var craft_length = 3;

// useful stuff
var Parent_Id;
  
// OUTPUTS
var keydown;
var click;

// Sync with database every 100ms = 0.1s
var sync = setInterval(runSync,100);


//---------------------------------------------------------------------------------
  
// grow land map first, grow ply position, grow tree map, grow hp map  
  
var land_map = new Array(map_size);       //land type
for (var a = 0; a < map_size; a++) {
      land_map[a] = new Array(map_size);
}  

var tree_map = new Array(map_size);       //tree type, player is in here
for (var a = 0; a < map_size; a++) {
      tree_map[a] = new Array(map_size);
}  

var hp_map = new Array(map_size);         //tree hp, not tree or no tree location hp = -1
for (var a = 0; a < map_size; a++) {
      hp_map[a] = new Array(map_size);
}  

var item_map = new Array(item_length*item_height);     // item window array, 0 means no item there
for (var a = 0; a < item_length*item_height; a++) {
      item_map[a] = new Array(3);    // 0 item name, 1 item categaory, 2 item stacks
}  

var craft_map = new Array(craft_length*craft_height);    // craft window array, 0 means no item there, only name

var new_map = new Array(2); // the result of craft


//---------------------------------------------------------------------------------


document.addEventListener('keydown', function(event) {	
    event.preventDefault();
	
	switch(event.keyCode){
		case 37: // right
			keydown = 37;
			break;	

		case 38: // up
		    keydown = 38;
			break;
		
		case 39: // left
			keydown = 39;
			break;
		
		case 40: // down
			keydown = 40;
			break;
			
		case 73: // i ,inventory
			keydown = 73;
			display("inventory");
			break;
			
		case 83: // s, status
			keydown = 83;			
			display("status");
			break;
			
		
		default: 
			break;	
	}   
	
	$.post(" move.njs ",
    {
        player_name: Name
		key: keydown
    });
	
});

document.addEventListener('mousedown', function(event) {	
	event.preventDefault();

    if (e.button == 0) { // left mouse click, use item
        click = 0;		
	}
		
	if (e.button == 1) { // middle mouse click, move item to craft area	or move it back to item area
       click = 1; 
	}
	
	
	$.post(" move.njs ",   // move 1 item a time
    {
		player: Name
		mouse: click
		type: Item_type
		Parent: Parent_Id  // to check whether the item is in item_area or craft_area
		ID: Item_name  // or button name, if item name = confirm or cancel, player is doing crafting
	});
	
});


//-----------------------------------------------------------------------

function build_land() { 
	for(var x = ply_xpos - (screen_length/2); x <= ply_xpos + (screen_length/2) -1; x++){
		for(var y = ply_ypos - (screen_height/2); x <= ply_ypos + (screen_height/2); y++){
			
			var xd = (screen_length/2) - (ply_xpos - x) +1;
			var yd = (screen_height/2) - (ply_ypos - y);
            seqnum = xd + yd*screen_length;
			
			var land = document.createElement("div");
			ID = "l_" + seqnum.toString();
	
			land.setAttribute("class", land_map[x][y]);
			land.setAttribute("id", ID); 
			land.setAttribute("style","width:60px");
			land.setAttribute("style","height:60px");
			land.setAttribute("style","position: absolute");
			land.style.zIndex = "0";
			land.style.backgroundImage = arr_to_image(land_map[x][y]); // tree type
			document.body.map.appendChild(land); 
	
			land.style.left = (xd-1)*(block_size)+'px'; 
			land.style.top = yd*(block_size)+'px';  	
		}
	}
}

function shift_land() { 
	for(var x = ply_xpos - (screen_length/2); x <= ply_xpos + (screen_length/2) -1; x++){
		for(var y = ply_ypos - (screen_height/2); x <= ply_ypos + (screen_height/2); y++){
			
			var xd = (screen_length/2) - (ply_xpos - x) +1;
			var yd = (screen_height/2) - (ply_ypos - y);
            seqnum = xd + yd*screen_length;
			ID = "l_" + seqnum.toString();
			
			var object = document.getElementById(ID);			
	
			object.setAttribute("class", land_map[x][y]);
			object.style.backgroundImage = arr_to_image(land_map[x][y]); // tree type
		}
	}
}

function build_object() { 
	for(var x = ply_xpos - (screen_length/2); x <= ply_xpos + (screen_length/2) -1; x++){
		for(var y = ply_ypos - (screen_height/2); x <= ply_ypos + (screen_height/2); y++){
			
			var xd = (screen_length/2) - (ply_xpos - x) +1;
			var yd = (screen_height/2) - (ply_ypos - y);
            seqnum = xd + yd*screen_length;
			
			var object = document.createElement("div");
			ID = "t_" + seqnum.toString();
	
			object.setAttribute("class", tree_map[x][y]);
			object.setAttribute("id", ID); 
			object.innerHTML = (hp_map[x][y]).toString();
			object.setAttribute("style","width:60px");
			object.setAttribute("style","height:60px");
			object.setAttribute("style","position: absolute");
			object.style.zIndex = "1";
			object.style.backgroundImage = arr_to_image(tree_map[x][y]); // tree type
			document.body.map.appendChild(object); 
	
			object.style.left = (xd-1)*(block_size)+'px'; 
			object.style.top = yd*(block_size)+'px';  	
		}
	}
}

function shift_object() { 
	for(var x = ply_xpos - (screen_length/2); x <= ply_xpos + (screen_length/2) -1; x++){
		for(var y = ply_ypos - (screen_height/2); x <= ply_ypos + (screen_height/2); y++){
			
			var xd = (screen_length/2) - (ply_xpos - x) +1;
			var yd = (screen_height/2) - (ply_ypos - y);
            seqnum = xd + yd*screen_length;
			ID = "t_" + seqnum.toString();
			
			var object = document.getElementById(ID);			
	
			object.setAttribute("class", tree_map[x][y]);
			object.style.backgroundImage = arr_to_image(tree_map[x][y]); // tree type
			object.innerHTML = (hp_map[x][y]).toString();
		}
	}
}



function object_to_image(class_type){  // give element class type to retrieve image
	var object = document.getElementsByClassName(class_type);
	
	switch(object){
		case "":
			break;				
		
		default: 
			break;	
	}
}


//-----------------------------------------------------------------------

function create_player(){    
    var player = document.createElement("BUTTON");
	player.setAttribute("id",Name); // player name
	player.style.backgroundImage = Skin; // player skin, url
	document.body.map.appendChild(player); 
	
	player.style.left = ;
	player.style.top = ;
}

//-----------------------------------------------------------------------
function build_inventory(){ 
    
	for(var x = 1; x <= item_length; x++){   // item_area
		for(var y = 0; y < item_height; y++){
			
			var loc = x+ y*item_length; // x location in array
			var item_id = "i_" + loc.toString();
			var item = document.createElement("BUTTON");			
			
			Item_name = item_map[loc][0];
			Item_type = item_map[loc][1];
			Stacks = item_map[loc][2];
			
			item.innerHTML =  Item_name + "(" + Stacks + ")";  // axe stack number equals to it's durability
			item.setAttribute("id", item_id );
			object.setAttribute("style","position: relative");
			item.style.backgroundImage = item_to_image(Item_name);		
			item.style.backgroundColor = "#E3E3E3";	
			item.onclick = function(){ get_item_id(item); }
			
			item_area.appendChild(item);   
		}
	}
	
	for(var loc = 0; loc < craft_length*craft_height; loc++){   // craft_area
			var item_id = "c_" + [loc+1].toString();
			var item = document.createElement("BUTTON");	
			item.setAttribute("id", item_id );
			item.style.backgroundColor = "#E3E3E3";	
			object.setAttribute("style","position: relative");
			craft_area.appendChild(item);   
	}
	
	// new_area
	var item = document.createElement("BUTTON");	
    item.setAttribute("id", "n_1");
	item.style.backgroundColor = "#E3E3E3";	
    object.setAttribute("style","position: relative");
	new_area.appendChild(item);  	
}

function item_to_image(id_name){  // give element id to retrieve image
	var item = document.getElementById(id_name);
	
	switch(item){
		case "":
			break;		
		
		default: 
			break;	
	}
}

function shift_item(){		
	for(var x = 1; x <= item_length; x++){
		for(var y = 0; y < item_height; y++){	
            var loc = x+ y*item_length; // x location in array	
            var item_id = "i_" + loc.toString();			
			var item = document.getElementById(item_id);		
			Item_name = item_map[loc][0];
			Stacks = item_map[loc][1];			
			item.innerHTML =  Item_name + "(" + Stacks + ")";  
			item.style.backgroundImage = item_to_image(Item_name);									
		}
	}
}

function shift_craft(){
	for(var loc = 0; loc < craft_length*craft_height; loc++){   // craft_area
	        var item_id = "i_" + (loc+1).toString();
			var item = document.getElementById(item_id);	
			Item_name = craft_map[loc];
			item.style.backgroundImage = item_to_image(Item_name);		
	}					
	
	$.post(" xxx.njs ",    // check the craft result
    {
		material = craft_map // an array
	});
}

function shift_new(){
	var item = document.getElementById("n_1");	
	Item_name = new_map[loc];
	item.style.backgroundImage = item_to_image(Item_name);		
}

function get_item_name(elem){
	var item_id = (window.getComputedStyle(elem, null)).id;
	var loc = parseInt(item_id.split("_")[1]);
	Item_name = item_map[loc][0]; 
	find_parent(Item_name);
}

//-----------------------------------------------------------------------

function display(name){
   var object = document.getElementById(name); 
   var visible = object.style.visibility;  
   
   if(visible == 'hidden'){
     visible = 'visible';
   }
   else{
     visible = 'hidden';
   }   
   
   object.style.visibility = visible;
}

function find_parent(child_id){
	var child = document.getElementById(child_id);
	if (child.parentNode && child.parentNode.id)
	Parent_Id = child.parentNode.id;
}

//-----------------------------------------------------------------------

function runSync(){
	build_map_array();
	build_inventory_array();
	shift_land();
	shift_object();
	shift_craft();
	shift_item();
	shift_new();
}


function build_map_array(){
// get absolute location of land, ocean, trees, players and fill all of them to corresponding array

}

function build_inventory_array(){
// get data of items and fill all of them to corresponding array

}

//-----------------------------------------------------------------------







