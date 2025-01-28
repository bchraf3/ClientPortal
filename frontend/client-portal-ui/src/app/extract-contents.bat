@echo off
setlocal EnableDelayedExpansion

:: Create timestamp for output file
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set datetime=%datetime:~0,8%_%datetime:~8,6%
set outputfile=extracted_contents_%datetime%.txt

:: Write initial file header
echo File extraction started at %time% > %outputfile%
echo =========================================================== >> %outputfile%

:: Recursively process all files
for /r %%F in (*.*) do (
    echo Processing: %%F
    
    echo. >> %outputfile%
    echo =========================================================== >> %outputfile%
    echo FILE: %%F >> %outputfile%
    echo =========================================================== >> %outputfile%
    
    type "%%F" >> %outputfile% 2>nul
    
    if errorlevel 1 (
        echo Error reading file: %%F
        echo ERROR: Could not read file >> %outputfile%
    )
)

echo.
echo Extraction complete! Contents saved to: %outputfile%
echo.

endlocal