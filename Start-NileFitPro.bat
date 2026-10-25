@echo off
chcp 65001 >nul
title NileFitPro — المنصة التفاعلية الشاملة
cd /d "%~dp0"
echo Starting NileFitPro Server on http://localhost:8095 ...
start "" "http://localhost:8095"
node server.js
pause
