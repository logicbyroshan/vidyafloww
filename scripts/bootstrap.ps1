param([string]$Root = "c:\Users\iamro\Desktop\VidyaFloww")

function New-Dir { param([string]$path) New-Item -Path $path -ItemType Directory -Force | Out-Null }
function New-File { param([string]$path, [string]$content = "") New-Item -Path $path -ItemType File -Force | Out-Null; if ($content) { Set-Content -Path $path -Value $content -Encoding UTF8 } }

Write-Host "==> [1/8] Creating root structure..." -ForegroundColor Cyan

# Root dirs
foreach ($d in @("apps","packages","docs","scripts","docker","nginx",".github",".vscode")) {
    New-Dir "$Root\$d"
}

# Apps
foreach ($d in @("backend","web","mobile","desktop")) {
    New-Dir "$Root\apps\$d"
}

# Packages
foreach ($p in @("api","ui","types","utils","constants","hooks","validation","config","themes","icons","assets")) {
    New-Dir "$Root\packages\$p"
}

Write-Host "==> [2/8] Creating backend structure..." -ForegroundColor Cyan

$backendRoot = "$Root\apps\backend"

# Backend top-level dirs
foreach ($d in @("media","static","locale","tests","logs")) {
    New-Dir "$backendRoot\$d"
}

# Standard Django app files
$djangoFiles = @("__init__.py","admin.py","apps.py","models.py","views.py","urls.py","serializers.py","permissions.py","services.py","selectors.py","filters.py","tasks.py","signals.py","tests.py")

function New-DjangoApp {
    param([string]$AppPath)
    New-Dir $AppPath
    foreach ($f in $djangoFiles) {
        $appName = Split-Path $AppPath -Leaf
        $todo = "# TODO: Implement $f for $appName`n"
        New-File "$AppPath\$f" $todo
    }
}

# config/
New-Dir "$backendRoot\config"
New-Dir "$backendRoot\config\settings"
foreach ($f in @("__init__.py","base.py","development.py","production.py","testing.py")) {
    New-File "$backendRoot\config\settings\$f" "# TODO: Settings - $f`n"
}
foreach ($f in @("__init__.py","urls.py","asgi.py","wsgi.py","celery.py")) {
    New-File "$backendRoot\config\$f" "# TODO: Config - $f`n"
}

# core/
$coreApps = @("accounts","authentication","organizations","campuses","users","permissions","sessions")
New-Dir "$backendRoot\core"
New-File "$backendRoot\core\__init__.py"
foreach ($app in $coreApps) { New-DjangoApp "$backendRoot\core\$app" }

# platform/
$platformApps = @("notifications","storage","audit","activity","imports","exports","reports","search","settings","workflows","forms","dashboard")
New-Dir "$backendRoot\platform"
New-File "$backendRoot\platform\__init__.py"
foreach ($app in $platformApps) { New-DjangoApp "$backendRoot\platform\$app" }

# modules/
$moduleApps = @("admissions","students","academics","attendance","examinations","homework","lms","finance","hr","library","hostel","transport","communication","documents","inventory","medical","events","discipline","analytics")
New-Dir "$backendRoot\modules"
New-File "$backendRoot\modules\__init__.py"
foreach ($app in $moduleApps) { New-DjangoApp "$backendRoot\modules\$app" }

# ai/
$aiApps = @("providers","assistants","prompts","ocr","predictions")
New-Dir "$backendRoot\ai"
New-File "$backendRoot\ai\__init__.py"
foreach ($app in $aiApps) { New-DjangoApp "$backendRoot\ai\$app" }

# integrations/
$integrationApps = @("payment","sms","email","whatsapp","biometric","gps","google","microsoft","webhook")
New-Dir "$backendRoot\integrations"
New-File "$backendRoot\integrations\__init__.py"
foreach ($app in $integrationApps) { New-DjangoApp "$backendRoot\integrations\$app" }

# common/
$commonDirs = @("models","serializers","permissions","pagination","middleware","validators","mixins","exceptions","utils")
New-Dir "$backendRoot\common"
New-File "$backendRoot\common\__init__.py"
foreach ($d in $commonDirs) {
    New-Dir "$backendRoot\common\$d"
    New-File "$backendRoot\common\$d\__init__.py" "# TODO: Implement common/$d`n"
}

Write-Host "==> [3/8] Creating web structure..." -ForegroundColor Cyan

$webRoot = "$Root\apps\web"
$webDirs = @("src","src\app","src\layouts","src\routes","src\pages","src\components","src\features","src\services","src\stores","src\hooks","src\types","src\utils","src\styles","src\assets","src\lib")
foreach ($d in $webDirs) { New-Dir "$webRoot\$d" }

# Feature sub-structure scaffold
$featureDirs = @("components","pages","api","hooks","schemas","types","utils","constants")
foreach ($fd in $featureDirs) { New-Dir "$webRoot\src\features\$fd" }

# Web root files
New-File "$webRoot\package.json"
New-File "$webRoot\tsconfig.json"
New-File "$webRoot\vite.config.ts"
New-File "$webRoot\index.html"
New-File "$webRoot\.env.example"
New-File "$webRoot\README.md"
New-File "$webRoot\src\main.tsx"
New-File "$webRoot\src\app\App.tsx"
New-File "$webRoot\src\styles\globals.css"

Write-Host "==> [4/8] Creating mobile structure..." -ForegroundColor Cyan

$mobileRoot = "$Root\apps\mobile"
$mobileDirs = @("src","src\app","src\navigation","src\features","src\components","src\services","src\stores","src\hooks","src\types","src\utils","src\assets")
foreach ($d in $mobileDirs) { New-Dir "$mobileRoot\$d" }

New-File "$mobileRoot\package.json"
New-File "$mobileRoot\tsconfig.json"
New-File "$mobileRoot\app.json"
New-File "$mobileRoot\.env.example"
New-File "$mobileRoot\README.md"
New-File "$mobileRoot\src\app\App.tsx"

Write-Host "==> [5/8] Creating desktop structure..." -ForegroundColor Cyan

$desktopRoot = "$Root\apps\desktop"
$desktopDirs = @("electron","electron\main","electron\preload","src","src\app","src\layouts","src\routes","src\pages","src\components","src\features","src\services","src\stores","src\hooks","src\types","src\utils")
foreach ($d in $desktopDirs) { New-Dir "$desktopRoot\$d" }

New-File "$desktopRoot\package.json"
New-File "$desktopRoot\tsconfig.json"
New-File "$desktopRoot\.env.example"
New-File "$desktopRoot\README.md"
New-File "$desktopRoot\electron\main\index.ts"
New-File "$desktopRoot\electron\preload\index.ts"
New-File "$desktopRoot\src\app\App.tsx"

Write-Host "==> [6/8] Creating packages..." -ForegroundColor Cyan

foreach ($pkg in @("api","ui","types","utils","constants","hooks","validation","config","themes","icons","assets")) {
    $pkgPath = "$Root\packages\$pkg"
    New-File "$pkgPath\package.json"
    New-File "$pkgPath\tsconfig.json"
    New-File "$pkgPath\README.md"
    New-File "$pkgPath\index.ts" "// TODO: Export $pkg package members`n"
    New-File "$pkgPath\src\index.ts" "// TODO: Implement $pkg`n"
    New-Dir "$pkgPath\src"
}

Write-Host "==> [7/8] Creating docs..." -ForegroundColor Cyan

$docs = @(
    "01-project-overview.md",
    "02-architecture.md",
    "03-folder-structure.md",
    "04-coding-standards.md",
    "05-api-guidelines.md",
    "06-database-guidelines.md",
    "07-permissions.md",
    "08-module-development.md",
    "09-ui-guidelines.md",
    "10-git-workflow.md",
    "11-deployment.md",
    "12-roadmap.md"
)
foreach ($doc in $docs) { New-File "$Root\docs\$doc" "# $doc`n`n> TODO: Content coming soon`n" }

Write-Host "==> [8/8] Creating GitHub Actions and VSCode..." -ForegroundColor Cyan

New-Dir "$Root\.github\workflows"
New-File "$Root\.github\workflows\ci.yml"
New-File "$Root\.github\workflows\cd.yml"
New-File "$Root\.github\PULL_REQUEST_TEMPLATE.md"
New-File "$Root\.github\CODEOWNERS"

New-File "$Root\.vscode\settings.json"
New-File "$Root\.vscode\extensions.json"
New-File "$Root\.vscode\launch.json"

New-Dir "$Root\docker"
New-File "$Root\docker\Dockerfile.backend"
New-File "$Root\docker\Dockerfile.web"
New-File "$Root\docker\docker-compose.yml"
New-File "$Root\docker\docker-compose.dev.yml"
New-File "$Root\docker\.env.example"

New-Dir "$Root\nginx"
New-File "$Root\nginx\nginx.conf"
New-File "$Root\nginx\default.conf"

New-File "$Root\.env.example"

Write-Host "`n[SUCCESS] VidyaFloww monorepo structure created!" -ForegroundColor Green
