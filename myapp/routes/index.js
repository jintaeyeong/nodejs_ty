var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var conn = mysql.createConnection({
    host:'localhost',
    user:'nodejs',
    password:'dlf2tka4dh',
    database:'final'
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

//제품 정보 생성
router.get('/create', function(req, res, next) {
    res.render('create');
});

//제품 정보 생성한 후 전달
router.post('/create',function(req, res, next){
  var body = req.body;
  conn.query('INSERT INTO products(name,price,description) values(?,?,?)',[body.name, body.price, body.description],
      function(){
    res.redirect('/products');
  });
});

//제품 정보 보기
router.get('/products', function(req, res,next) {
    conn.query('select * from products',function(err,rows,field){
    res.render('products',{rows:rows});
    //res.send(rows);
  });
});

//제품 삭제 구현
router.post('/',function(req,res,next){
    var body = req.body;
    conn.query(`delete from products where products.id=?`,[body.id]
    , function(){
      res.redirect('/products');
    });
});

//업데이트 구현
router.get('/:id/edit',function(req,res){
        var id = req.params.id;
        var sql = 'select * from products where id=?';
        conn.query(sql,[id],function(err, products, fields) {
        res.render('edit',{products:products[0]});
        });

});

router.post('/:id/edit',function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var id = req.params.id;
    var sql = 'UPDATE products set name=?, price=?, description=? where id=?';
    conn.query(sql,[name,price,description,id], function(err,products,fileds){
      res.redirect('/products');
    })
});

module.exports = router;
/*res 클라이언트로 응답을 위한 객체/
/res.send(): 문자열로 응답
/res.json(): 제이슨(Json) 객체로 응답
/res.render(): 제이드 템플릿을 렌더링
res.sendfile(): 파일 다운로드*/
