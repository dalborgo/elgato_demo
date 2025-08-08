Get-DisplayInfo |
    Where-Object -Property Active -EQ $true |
    ForEach-Object {
        "$( $_.Mode.RefreshRate ) Hz"
    } | ConvertTo-Json -Compress
