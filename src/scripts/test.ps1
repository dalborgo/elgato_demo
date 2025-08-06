param (
    [string]$json
)

$data = $json | ConvertFrom-Json

Get-DisplayInfo | Where-Object -Property Active -EQ $true | ForEach-Object {
    [pscustomobject]@{
        DisplayId = $_.DisplayId
        DisplayName = $_.DisplayName
        Width = $_.Mode.Width
        Height = $_.Mode.Height
        RefreshRate = $_.Mode.RefreshRate
        test = $data
    }
} | ConvertTo-Json -Compress
