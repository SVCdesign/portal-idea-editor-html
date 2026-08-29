# Tira a MOLDURA BRANCA desenhada dentro de cada arte e devolve o arquivo no
# tamanho padrao 1696x2528, sangrando ate a borda. Cada arte tem a moldura dela
# (de 0 a 119 px), por isso a medida e detectada arquivo a arquivo.
# Le de assets-originais (o backup) e grava em assets.
Add-Type -AssemblyName System.Drawing

# AVISO (vistoria de 2026-08-29): os DOIS caminhos abaixo estao MORTOS — a pasta
# D:\00- CODIGO\matrix-editor-reference NAO existe mais neste PC. Rodar assim nao
# funciona: troque $ORIG e $DEST pelas pastas certas antes de usar. (Nao tem relacao
# com a mudanca do mundo pra D:\WORKSPACE\Special Vision — ja tinha sumido antes.)
$ORIG = "D:\00- CODIGO\matrix-editor-reference\assets-originais"
$DEST = "D:\00- CODIGO\matrix-editor-reference\assets"

# trava amigavel: avisa em portugues comum em vez de estourar um erro tecnico
if (-not (Test-Path $ORIG)) {
  Write-Host ""
  Write-Host "  Nao achei a pasta das artes originais:"
  Write-Host "    $ORIG"
  Write-Host ""
  Write-Host '  Esse caminho nao existe mais neste PC. Abra este arquivo, troque as linhas'
  Write-Host '  $ORIG e $DEST pelas pastas certas, e rode de novo.'
  Write-Host ""
  exit 1
}
$LARG = 1696
$ALT  = 2528
$ALVO = $LARG / $ALT

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$par = New-Object System.Drawing.Imaging.EncoderParameters 1
$par.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 97L)

function Medir([System.Drawing.Bitmap]$b) {
  $lim = 238; $W = $b.Width; $H = $b.Height; $n = 9
  $clara = {
    param($eixo, $i)
    for ($s = 1; $s -le $n; $s++) {
      if ($eixo -eq 'h') { $c = $b.GetPixel([int]($W * $s / ($n+1)), $i) }
      else               { $c = $b.GetPixel($i, [int]($H * $s / ($n+1))) }
      if ($c.R -lt $lim -or $c.G -lt $lim -or $c.B -lt $lim) { return $false }
    }
    return $true
  }
  $t=0; while ($t -lt 300 -and (& $clara 'h' $t)) { $t++ }
  $b2=0; while ($b2 -lt 300 -and (& $clara 'h' ($H-1-$b2))) { $b2++ }
  $e=0; while ($e -lt 300 -and (& $clara 'v' $e)) { $e++ }
  $d=0; while ($d -lt 300 -and (& $clara 'v' ($W-1-$d))) { $d++ }
  return @{ t=$t; b=$b2; e=$e; d=$d }
}

"arquivo           moldura(t/b/e/d)   corte extra   esticou"
"-------------------------------------------------------------"
Get-ChildItem "$ORIG\*.jpg" | Sort-Object Name | ForEach-Object {
  $bmp = New-Object System.Drawing.Bitmap $_.FullName
  $m = Medir $bmp

  if ($m.t -eq 0 -and $m.b -eq 0 -and $m.e -eq 0 -and $m.d -eq 0 -and $bmp.Width -eq $LARG -and $bmp.Height -eq $ALT) {
    $bmp.Dispose()
    Copy-Item $_.FullName (Join-Path $DEST $_.Name) -Force   # ja esta perfeita: nao reencoda
    "{0,-16} sem moldura         -             (copiada intacta)" -f $_.Name
    return
  }

  # retangulo do conteudo (sem a moldura)
  $cx = $m.e; $cy = $m.t
  $cw = $bmp.Width - $m.e - $m.d
  $ch = $bmp.Height - $m.t - $m.b
  # ajusta ao formato da pagina cortando o excesso do lado mais folgado
  $r = $cw / $ch
  if ($r -gt $ALVO) { $novoW = [int]($ch * $ALVO); $cx += [int](($cw - $novoW)/2); $cw = $novoW; $extra = "largura" }
  else              { $novoH = [int]($cw / $ALVO); $cy += [int](($ch - $novoH)/2); $ch = $novoH; $extra = "altura" }

  $out = New-Object System.Drawing.Bitmap $LARG, $ALT
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $destRect = New-Object System.Drawing.Rectangle 0, 0, $LARG, $ALT
  $g.DrawImage($bmp, $destRect, $cx, $cy, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $bmp.Dispose()

  $out.Save((Join-Path $DEST $_.Name), $codec, $par)
  $out.Dispose()
  "{0,-16} {1,3}/{2,3}/{3,3}/{4,3}        {5,-8}      {6:P0}" -f $_.Name, $m.t, $m.b, $m.e, $m.d, $extra, ($LARG/$cw)
}