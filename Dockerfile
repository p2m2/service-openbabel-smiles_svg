FROM debian:stable-slim

RUN apt-get update -y && apt-get install -y wget unzip cmake build-essential libxml2-dev nodejs npm
WORKDIR /babel
RUN wget https://github.com/openbabel/openbabel/archive/openbabel-3-1-1.tar.gz
RUN tar xvf openbabel-3-1-1.tar.gz
WORKDIR /babel/openbabel-openbabel-3-1-1/build
RUN cmake .. && make -j2
#RUN make test
RUN make install
COPY ./smiles_to_svg /usr/bin/
WORKDIR /service
RUN npm install
RUN npm install express
RUN npm install http-errors
COPY service.js .
CMD ["node" ,"service.js"]


