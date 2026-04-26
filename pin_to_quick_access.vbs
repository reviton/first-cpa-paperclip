Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.BrowseForFolder(0, "Select folder:", 0, 0)

Dim folderPath
folderPath = "C:\Users\tomerp\Desktop\first-cpa-organization"

' Pin to Quick Access via adding to registry
Set objReg = GetObject("winmgmts:").ExecMethod("StdRegProv", "EnumKey", , "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\HomeFavoritesSortOrder")

objShell.Exec("cmd.exe /c explorer.exe """ & folderPath & """")
