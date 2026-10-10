$pipes = [System.IO.Directory]::GetFiles("\\.\pipe\")
$pipes | Where-Object { $_ -match 'andbox|orkBuddy|wb[-_]' }
Write-Output "---total---"
$pipes.Count
