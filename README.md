# service-openbabel-smiles_svg
service to convert a smiles code to svg

## use

```bash
docker run -t p2m2/service-openbabel-smiles_svg smiles_to_svg "[H][C@]1(CO)O[C@@]([H])(O[C@@]2([H])[C@]([H])(O)[C@@]([H])(COC(=O)CC(O)=O)O[C@@]([H])(OC3=CC4=C(O)C=C(O)C=C4[O+]=C3C3=CC=C(O)C(O)=C3)[C@]2([H])O)[C@]([H])(O)[C@@]([H])(O)[C@]1([H])O" > smiles_mol.svg
```

