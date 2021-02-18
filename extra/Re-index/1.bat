@echo off
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
xcopy E:\Dropbox\dazuixia\html E:\Dropbox\dazuixia\extra\Re-index\all_htmls /s /e /i /y
del /f /s /q E:\Dropbox\dazuixia\extra\Re-index\all_htmls\contents.html
del /f /s /q E:\Dropbox\dazuixia\extra\Re-index\all_htmls\index.html
del /f /s /q E:\Dropbox\dazuixia\extra\Re-index\all_htmls\denied.html
start "" "C:\Program Files (x86)\Softany\WinCHM\winchm.exe"