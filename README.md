# Instructions

## Endpoints HTTP

Graph: http://127.0.0.1:8000/subgraphs/name/example/graphql

IPFS: http://localhost:5001/

## Launch application

### Start Dev Server

1. Run docker (docker compose up)
2. npm run dev

### Gen Dev Files

1. npm run build-contract-abi
2. npm run genContractType

### Migrate contracts to ganache

1. truffle migrate

### Create new subgraph

1. npm run codegen
2. npm run create-local
3. npm run deploy-local

### Upload files to ipfs

curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\metadata1.json http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\metadata2.json http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\1_immatricolazione.json http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\1_immatricolazione.pdf http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\2_incidente.pdf http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\2_incidente.json http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\3_meccanico.pdf http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\3_meccanico.json http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\4_revisione.pdf http://localhost:5001/api/v0/add
curl -X POST -F file=@%cd%\test\VehicleMeta\JSON\4_revisione.json http://localhost:5001/api/v0/add

### Access contracts and create tokens

truffle console
const VRT = await VehicleRegistrationToken.deployed();
await VRT.mintToken("http://127.0.0.1:8080/QmPvVh4of1B8VdGgAZafDCK5g5DeLRa6sCbfVoGJ92M2v9", {from:accounts[0]});
await VRT.mintToken("http://127.0.0.1:8080/QmUZxpzDj3v8xifQX6Lqv6wNdPTDkNWuskMRuiN68N9MbG", {from:accounts[0]});
await VRT.addCertification(1,1,"http://127.0.0.1:8080/QmPERK8NK6ssaNCPMoQa1Qencka4bMrqi3y2xx9JFTdsnC", {from:accounts[0]});
await VRT.addCertification(1,2,"http://127.0.0.1:8080/QmSndp3U5QwC56xcssjL19gmS1tTQHe42xyDZukJZgYCEB", {from:accounts[0]});
await VRT.addCertification(1,3,"http://127.0.0.1:8080/QmUz8HTHPRWHapsvoDyE2hvdmshHE3UXoqEgkTToWvG1La", {from:accounts[0]});
await VRT.addCertification(1,6,"http://127.0.0.1:8080/QmYkz2tVdiSbws2GCEk71cVrGEneSWhZsPbj6KiyanfLMB", {from:accounts[0]});
const VMP = await VehicleMarketplace.deployed();
await VMP.placeNftOnSale(1,20000);
