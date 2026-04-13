@echo off
echo.
echo  === Reset GitHub Pages Custom Domain for HTTPS ===
echo.
echo  This removes and re-adds lunar.garrigan.me to trigger SSL cert provisioning.
echo.
set /p TOKEN=Paste your GitHub Personal Access Token (repo scope): 

echo.
echo  Step 1: Removing custom domain...
curl -s -X DELETE "https://api.github.com/repos/mgarrigan-hue/MarkLunarG/pages" -H "Authorization: Bearer %TOKEN%" -H "Accept: application/vnd.github+json" >nul 2>&1

timeout /t 5 /nobreak >nul

echo  Step 2: Re-enabling GitHub Pages...
curl -s -X POST "https://api.github.com/repos/mgarrigan-hue/MarkLunarG/pages" -H "Authorization: Bearer %TOKEN%" -H "Accept: application/vnd.github+json" -H "Content-Type: application/json" -d "{\"source\":{\"branch\":\"main\",\"path\":\"/\"}}" >nul 2>&1

timeout /t 5 /nobreak >nul

echo  Step 3: Setting custom domain to lunar.garrigan.me...
curl -s -o response.tmp -w "%%{http_code}" -X PUT "https://api.github.com/repos/mgarrigan-hue/MarkLunarG/pages" -H "Authorization: Bearer %TOKEN%" -H "Accept: application/vnd.github+json" -H "Content-Type: application/json" -d "{\"cname\":\"lunar.garrigan.me\",\"source\":{\"branch\":\"main\",\"path\":\"/\"},\"https_enforced\":false}" > status.tmp
set /p STATUS=<status.tmp
del response.tmp status.tmp 2>nul

if "%STATUS%"=="204" (
    echo.
    echo  Done! Custom domain reset successfully.
    echo  HTTPS certificate will provision in 5-15 minutes.
    echo  Then go to Settings ^> Pages and check "Enforce HTTPS".
) else (
    echo.
    echo  Status: %STATUS% - check your token has "repo" scope.
)
echo.
echo  You can now delete your GitHub token at https://github.com/settings/tokens
echo.
pause
