//axe_equip
var querystring=require('querystring');
var param=querystring.parse(process.env.QUERY_STRING);
var database=require('./server.js');//database

console.log('Content-type: text/html;charset=utf-8\n');

int nameOrder=0;

//找玩家 
for(nameOrder=0;nameOrder<database.playerList.length;nameOrder++)
{
	if(database.param.player_name == database.playerList[nameOrder].name)
	{
		break;
	}
}

int axeOrder=0;

//找斧頭 
for(axeOrder=0;axeOrder<database.playerList[nameOrder].axe.length;axeOrder++)
{
	if(database.param.axe_name == database.playerList[nameOrder].axe[axeOrder].name)
	{
		break;
	}
}

//裝備斧頭
for(int i=0;i<database.playerList[nameOrder].axe.length;i++)
{
	if(database.playerList[nameOrder].axe[i].equip==1)
	{
		database.playerList[nameOrder].axe[i].equip=0;
		database.playerList[nameOrder].axe[axeOrder].equip=1;
		break;
	}
}	
 
