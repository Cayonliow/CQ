//food_use
var querystring=require('querystring');
var param=querystring.parse(process.env.QUERY_STRING);
var database=require('./server.js');//database

console.log('Content-type: text/html;charset=utf-8\n');


//§äª±®a 

connection.query('select `HUNGER` from `PLAYER` where `NAME` like param.player_name', function(error,player)
{
	if(error)
	{
        throw error;
	}
});
    
connection.query('select `value`,`amount` from `foodList` where `name` like param.food_name', function(error,food)
{
	if(error)
	{
       	throw error;
	}
});
    
if(food.amount>0)
{
	player.Hunger=player.Hunger+food.value;
	food.amount-1;	
}
    
connection.query('update `PLAYER` set `HUNGER`=player.Hunger where `NAME` like param.player_name', function(error,result1)
{
	if(error)
	{
       	throw error;
	}
});    
    
connection.query('update `foodList` set `amount`=food.amount where `name` like param.food_name', function(error,result2)
{
	if(error)
	{
       	throw error;
	}
});  



/*for(nameOrder=0;nameOrder<database.playerList.length;nameOrder++)
{
	if(database.param.player_name == database.playerList[nameOrder].name)
	{
		break;
	}
}

int foodOrder=0;

//§ä­¹ª« 

int value=0;
value = select 'value' from 'foodList' where 'name' like param.player_name;


for(foodOrder=0;foodOrder<database.playerList[nameOrder].axe.length;foodOrder++)
{
	if(database.param.food_name == database.playerList[nameOrder].food[foodOrder].name)
	{
		if(database.playerList[nameOrder].food[foodOrder].hp>0)
		{
			database.playerList[nameOrder].food[foodOrder].hp=database.playerList[nameOrder].food[foodOrder].hp-1;s
			database.playerList[nameOrder].Hunger = database.playerList[nameOrder].Hunger + database.playerList[nameOrder].food[foodOrder].value;
		}
		break;
	}
}*/
