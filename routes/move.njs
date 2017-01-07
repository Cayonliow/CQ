#!/usr/local/bin/node

var querystring=require('querystring');
var param=querystring.parse(process.env.QUERY_STRING);
var database=require('./server.js');

console.log('Content-type: text/html;charset=utf-8\n');

connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query 
  // results will contain the results of the query 
  // fields will contain information about the returned results fields (if any) 
});






int nameOrder=0;
//nameOrder 名字在player清單次序
for(nameOrder=0; nameOrder<database.playerList.length;nameOrder++){
		if(database.param.player_name == database.playerList[nameOrder].name) break;
}
int axeorder=0;
for(axeuseful=0,axeorder=0;axeorder<database.playerList[nameOrder].axe.length;axeorder++){
	if(database.playerList[nameOrder].axe[axeorder].equip == 1) {
	axeuseful=1;
	break;
	}
}
int treetest=0;
int peopletest=0;
int oceantest=0;
//right
if(param.key==37){	
	
	for(landOrder=0;landOrder<landList.length;landOrder++){
		if((database.param.landList[landOrder].locX+1)==database.param.landList[i].locX)){
				if((database.param.landList[landOrder].locY)==database.param.landList[i].locY){
					oceantest = 1;
				}
		}
	}
	if(oceantest==0){
		//if(database.param.playerList[nameOrder].locX+1){
			//treeOrder 樹在tree清單次序
			for(treeOrder=0;treeOrder<treeList.length;treeOrder++){
				//判斷目標位置有樹否?
				if((database.param.playerList[nameOrder].locX+1) == database.param.treeList[treeOrder].locX)){
					if((database.param.playerList[nameOrder].locY)== database.param.treeList[treeOrder].locY){
						treetest=1;  //有樹
						if(axeuseful=1){
						database.param.playerList[nameOrder].axe[axeorder].endurance=database.param.playerList[nameOrder].axe[axeorder].endurance-1;//砍樹-耐久	
						database.param.treeList[treeOrder].hp =database.param.treeList[treeOrder].hp-1;
						database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-2;//砍樹減少2飽食度
						}
						else{
						
							break;
						}
						//砍一下樹
						if(database.param.treeList[treeOrder].hp==0){
							//delete tree from treeList;
						}
						break;
					}
				}
			}
		
		for(i=0; i<database.playerList.length; i++){
			if((database.param.playerList[nameOrder].locX+1)==database.param.playerList[i].locX)){
				if((database.param.playerList[nameOrder].locY)==database.param.playerList[i].locY){
					peopletest=1;
					break;
					//有人
				}
			}
		}

		if(treetest==0&&peopletest==0){
			//沒人沒樹
			database.param.playerList[nameOrder].locX=database.param.playerList[nameOrder].locX+1;//移動
			database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-1;//減飢餓值
		}
	}
	else{}
}
//left
if(param.key==39){
	
	for(landOrder=0;landOrder<landList.length;landOrder++){
		if((database.param.landList[landOrder].locX-1)==database.param.landList[i].locX)){
				if((database.param.landList[landOrder].locY)==database.param.landList[i].locY){
					oceantest = 1;
				}
		}
	}
	if(oceantest==0){
		//if(database.param.playerList[nameOrder].locX-1){
			//treeOrder 樹在tree清單次序
			for(treeOrder=0;treeOrder<treeList.length;treeOrder++){
				//判斷目標位置有樹否?
				if((database.param.playerList[nameOrder].locX-1) == database.param.treeList[treeOrder].locX)){
					if((database.param.playerList[nameOrder].locY)== database.param.treeList[treeOrder].locY){
						treetest=1;//有樹
						database.param.treeList[treeOrder].hp =database.param.treeList[treeOrder].hp-1;
						//砍一下樹
						if(database.param.treeList[treeOrder].hp==0){
							//delete tree from treeList;
						}
						database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-2;//砍樹減少2飽食度
						break;
					}
				}
			}
		//}
		
		for(i=0; i<database.playerList.length; i++){
			if((database.param.playerList[nameOrder].locX-1)==database.param.playerList[i].locX)){
				if((database.param.playerList[nameOrder].locY)==database.param.playerList[i].locY){
					peopletest=1;
					break;
					//有人
				}
			}
		}

		if(treetest==0&&peopletest==0){
			//沒人沒樹
			database.param.playerList[nameOrder].locX=database.param.playerList[nameOrder].locX-1;//移動
			database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-1;//減飢餓值
		}
	}
	else{}
}
//down
if(param.key==38){
	
	for(landOrder=0;landOrder<landList.length;landOrder++){
		if((database.param.landList[landOrder].locX)==database.param.landList[i].locX)){
				if((database.param.landList[landOrder].locY+1)==database.param.landList[i].locY){
					oceantest = 1;
				}
		}
	}
	if(oceantest==0){
		//if(database.param.playerList[nameOrder].locY+1){
			//treeOrder 樹在tree清單次序
			for(treeOrder=0;treeOrder<treeList.length;treeOrder++){
				//判斷目標位置有樹否?
				if((database.param.playerList[nameOrder].locY+1) == database.param.treeList[treeOrder].locY)){
					if((database.param.playerList[nameOrder].locX)== database.param.treeList[treeOrder].locX){
						treetest=1;  //有樹
						if(axeuseful=1){
							database.param.playerList[nameOrder].axe[axeorder].endurance=database.param.playerList[nameOrder].axe[axeorder].endurance-1;//砍樹-耐久	
							database.param.treeList[treeOrder].hp =database.param.treeList[treeOrder].hp-1;
							database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-2;//砍樹減少2飽食度
						}
						else{
							break;
						}
						//砍一下樹
						if(database.param.treeList[treeOrder].hp==0){
							//delete tree from treeList; 
						}
						break;
					}
				}
			}
		//}
		
		for(i=0; i<database.playerList.length; i++){
			if((database.param.playerList[nameOrder].locY+1)==database.param.playerList[i].locY)){
				if((database.param.playerList[nameOrder].locX)==database.param.playerList[i].locX){
					peopletest=1;
					break;
					//有人
				}
			}
		}

		if(treetest==0&&peopletest==0){
			//沒人沒樹
			database.param.playerList[nameOrder].locY=database.param.playerList[nameOrder].locY+1;//移動
			database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-1;//減飢餓值
		}
	}
	else{}
}
//UP
if(param.key==40){
	
	for(landOrder=0;landOrder<landList.length;landOrder++){
		if((database.param.landList[landOrder].locX)==database.param.landList[i].locX)){
				if((database.param.landList[landOrder].locY-1)==database.param.landList[i].locY){
					oceantest = 1;
				}
		}
	}
	if(oceantest==0){
		//if(database.param.playerList[nameOrder].locY+1){
			//treeOrder 樹在tree清單次序
			for(treeOrder=0;treeOrder<treeList.length;treeOrder++){
				//判斷目標位置有樹否?
				if((database.param.playerList[nameOrder].locY-1) == database.param.treeList[treeOrder].locY)){
					if((database.param.playerList[nameOrder].locX)== database.param.treeList[treeOrder].locX){
						treetest=1;//有樹
						if(axeuseful=1){
							database.param.playerList[nameOrder].axe[axeorder].endurance=database.param.playerList[nameOrder].axe[axeorder].endurance-1;//砍樹-耐久	
							database.param.treeList[treeOrder].hp =database.param.treeList[treeOrder].hp-1;
							database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-2;//砍樹減少2飽食度
						}
						else{
							break;
						}
						//砍一下樹
						if(database.param.treeList[treeOrder].hp==0){
							//delete tree from treeList; 
						}
						break;
					}
				}
			}
		//}
		
		for(i=0; i<database.playerList.length; i++){
			if((database.param.playerList[nameOrder].locY-1)==database.param.playerList[i].locY)){
				if((database.param.playerList[nameOrder].locX)==database.param.playerList[i].locX){
					peopletest=1;
					break;
					//有人
				}
			}
		}

		if(treetest==0&&peopletest==0){
			//沒人沒樹
			database.param.playerList[nameOrder].locY=database.param.playerList[nameOrder].locY-1;//移動
			database.param.playerList[nameOrder].Hunger = database.param.playerList[nameOrder].Hunger-1;//減飢餓值
		}
	}
	else{}
}

// vi:et:ft=javascript
