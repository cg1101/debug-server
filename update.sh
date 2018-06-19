#!/bin/bash

BASE=..

SRC=${BASE}/op2-navigation/dist
DST=static/
echo "Clearing ${DST}"
rm -rf ${DST}
mkdir -p ${DST}
echo "Copying from ${SRC} ..."
cp -r ${SRC}/* ${DST}
echo "Content of ${DST} ..."
ls ${SRC}
echo -e "\n\n\n"

SRC=${BASE}/op2-user-management/dist
DST=static/op2-user-management
echo "Clearing ${DST}"
rm -rf ${DST}
mkdir -p ${DST}
echo "Copying from ${SRC} ..."
cp -r ${SRC}/* ${DST}
echo "Content of ${DST} ..."
ls ${SRC}
echo -e "\n\n\n"

SRC=${BASE}/op2-campaigns/dist
DST=static/op2-campaigns
echo "Clearing ${DST}"
rm -rf ${DST}
mkdir -p ${DST}
echo "Copying from ${SRC} ..."
cp -r ${SRC}/* ${DST}
echo "Content of ${DST} ..."
ls ${SRC}
echo -e "\n\n\n"