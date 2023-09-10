const proxyErrorHandler = function(err, res, next) {
    console.log(err)
    switch (err && err.code) {
      case 'ECONNRESET':    { return res.status(503).send({"_meta":{status:503,'message':'Service unavailable'}}); }
      case 'ECONNREFUSED':  { return res.status(503).send({"_meta":{status:503,'message':'Service unavailable'}}); }
      default:              { next(err); }
    }
}

const auth = function(req,res,next){
    if(req.headers["authorization"]){
        next()
    }else{
        res.status(400).json({"_meta":{status:400,'message':'bearer token missing'}})
    }
}

module.exports = {proxyErrorHandler,auth}
