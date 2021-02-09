const os = require("os");
const express = require('express') ;
const { exec } = require('child_process');
const createError = require('http-errors')

const app = express() ;
var port = 3000 ;
var max_retention = 10000 ;
var size_clean_retention = 500 ;

if (process.env.PORT) {
    port = process.env.PORT
}

if (process.env.MAX_RETENTION) {
    max_retention = process.env.MAX_RETENTION
}

if (process.env.SIZE_CLEAN_RETENTION) {
    size_clean_retention = process.env.SIZE_CLEAN_RETENTION
}


/* security */
if (size_clean_retention>=max_retention) { size_clean_retention=5 ; }

/**
    - retention : memorize results
    - options : open babel option
*/
function build_svg(req, res, retention, options="") {
      let smiles_code=req.url.split("?")[1] ;
      console.log(smiles_code)

      if (!smiles_code || smiles_code.trim()=="") {
         console.error("smiles is not defined.") ;
         res.send("") ;
         return ;
      }

      res.setHeader('content-type', 'image/svg+xml');
      let idxObj = null ;
      if ( idxObj = retention
                   .map( (v,i) => { return { 'v' : v, 'i':i} } )
                   .filter( o => o.v.smiles == smiles_code )[0] ) {
        console.log(" - memory - ")
        retention[idxObj.i].date = Date.now();
        res.send(idxObj.v.svg);
      } else {
         let cmd=`obabel -:"${smiles_code}" ${options.join(" ")} -o svg | grep -v "molecule converted"`
         console.log(cmd)
         exec(cmd, (err, stdout, stderr) => {
            console.log(err)
            if (err) {
                res.send(createError(400, `Stdout '${stdout}' \n Stderr '${stderr}'`))
                return
            }

            console.log(Object.keys(retention).length)
            if ( Object.keys(retention).length >= max_retention ) {
                retention = retention.sort( (v1,v2) => v1.date>v2.date).splice(retention.length - size_clean_retention);
            }
            /* set current retention */
            svg = stdout.trim()
            retention.push({
                    'smiles' : smiles_code,
                    'date' : Date.now(),
                    'svg' : svg
            })
            console.error(stderr);
            res.send(svg)
        });

      }
}

var retention = [] ;
app.get('/smiles', (req, res) => build_svg(req,res,retention,[]) ) ;

var retention_gen3d = [] ;
app.get('/smiles/gen3d', (req, res) => build_svg(req,res, retention_gen3d, ["--gen3d"]) ) ;

app.listen(port, () => {
  console.log(`MAX_RETENTION:${max_retention}`)
  console.log(`SIZE_CLEAN_RETENTION:${size_clean_retention}`)
  console.log(`SVG Smiles (Open-Babel)) app listening at http://${os.hostname()}:${port}`)
})
