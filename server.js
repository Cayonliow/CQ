var mysql       = require('mysql');
var connection  = mysql.createConnection
                  (
                    {
                      host      : 'localhost', 
                      user      : 'wp2016_groupD',
                      password  : 'GROUPD',
                      databese  : 'wp2016_groupD'
                    }
                  );

connection.connect(function(err){
  if (err) throw err

  connection.query('SELECT * from PLAYER',function(err))

});

//if(param.action
/*connection.query('CREATE TABLE wp2016_groupD.ADMIN(Name char(100),Course char(100));',function(err)
                                            {
                                              if(err)throw err;
                                            
                                              console.log('DONE');
                                            }
                );
*/



//connection.end();













