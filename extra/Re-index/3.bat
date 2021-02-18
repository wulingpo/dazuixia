@echo off
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
copy E:\Dropbox\dazuixia\extra\Re-index\all_htmls_output\WebHelp\data.js E:\Dropbox\dazuixia\extra\Re-index\ /y
rd /s /q E:\Dropbox\dazuixia\extra\Re-index\all_htmls
rd /s /q E:\Dropbox\dazuixia\extra\Re-index\all_htmls_output