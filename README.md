# service-openbabel-smiles_svg
service to convert a smiles code to svg

## use with bash command

```bash
docker run -t inraep2m2/service-openbabel-smiles_svg smiles_to_svg "CN1CCC[C@H]1c2cccnc2" > smiles_mol.svg
```

## web service

return a svg image with the following request `http://<host>/smiles?<smiles>`

### use in img tag  

```html
<img src="http://localhost:3000/smiles?CN1CCC[C@H]1c2cccnc2" decoding="async" loading="lazy" alt="Nicotine" >
```


### env var

- PORT   : web service port  (*default*:`3000`) 
- MAX_RETENTION : number of svg "in memory" build by open-babel (*default*:`10 000`) 
- SIZE_CLEAN_RETENTION : number of clean group when max retention is reached (*default*:`500`)

retention policy : oldest ask are removed.


```bash
docker run -p 3000:30005 --env PORT=30005 --env MAX_RETENTION=50000 --env SIZE_CLEAN_RETENTION=10 \ 
-t inraep2m2/service-openbabel-smiles_svg smiles_to_svg "CN1CCC[C@H]1c2cccnc2" > smiles_mol.svg
```