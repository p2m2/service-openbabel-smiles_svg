FROM debian:stable-slim

RUN apt-get update -y && apt-get install -y wget unzip build-essential libxml2-dev libssl-dev python2.7 python-pip python-openbabel
WORKDIR /cmake
RUN wget https://github.com/Kitware/CMake/releases/download/v3.19.4/cmake-3.19.4.tar.gz
RUN tar xvf cmake-3.19.4.tar.gz
WORKDIR /cmake/cmake-3.19.4
RUN ./bootstrap
RUN make -j2
RUN make install
WORKDIR /babel
RUN wget https://github.com/openbabel/openbabel/archive/openbabel-3-1-1.tar.gz
RUN tar xvf openbabel-3-1-1.tar.gz
WORKDIR /babel/openbabel-openbabel-3-1-1/build
RUN cmake .. -DPYTHON_EXECUTABLE=/usr/bin/python -DPYTHON_BINDINGS=ON -DRUN_SWIG=ON && make -j2 && make install
COPY ./smiles_to_svg /usr/bin/
RUN pip install blender-chemicals openbabel



