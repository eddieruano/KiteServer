set appname to "Messages" -------------------------- Set this to the App you want to look at

set winstuff to "defaultval"
set menustuff to "defaultval"

tell application appname
  activate
end tell

tell application "System Events"
  tell process appname
    set winstuff to entire contents of front window
    set menustuff to entire contents of menu bar 1
  end tell
end tell
--return winstuff & "rrrr" & menustuff -- comment this out to get just winstuff
return winstuff -- comment this out too to get just menustuff
--return menustuff