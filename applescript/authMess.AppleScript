on run argv
	tell application "Messages"
		activate
	end tell
	-- Wait for load
	delay 0.9
	tell application "System Events"
		try
			set value of text field 1 of splitter group 1 of window "Messages" of application process "Messages" to item 1 of argv
			set value of text field 2 of splitter group 1 of window "Messages" of application process "Messages" to item 2 of argv
			tell application "System Events" to key code 49
			tell application "System Events" to key code 51
			delay 0.1
			click button "Sign in" of splitter group 1 of window "Messages" of application process "Messages"
			click button 3 of window "Messages" of application process "Messages"
			-- Delay 5 seconds to get full login input
			delay 5
			-- Quit after 5 seconds
			tell application "Messages" 
				quit
			end tell
		-------- Here handle errors with opening -----
		on error errText number errNum
			--Error Code
			display dialog "Error with login."
			--End Error Code
		end
	end tell
	-- Reopen Messages
	tell application "Messages"
		activate
		delay 5
		quit
	end tell
	-- Reopen for complete Messages
	tell application "Messages"
		activate
	end tell
		--tell process "Messages"
			--try
			--text field 1 of splitter group 1 of window Messages of application process Messages
			--on error errText number errNum
				--display dialog "Error."
			--end
			--set value of text area 1 of scroll area 4 of splitter group 1 of window 1 to item 1 of argv
			--delay 0.1
			--keystroke return
			--keystroke return
			--delay 0.1
		--end tell
		--key down command
		--keystroke tab
		--key up command
end run
