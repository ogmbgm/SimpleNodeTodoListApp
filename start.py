from Naked.toolshed.shell import execute_js
import webbrowser

webbrowser.open('http://localhost:3000/', new=2, autoraise=True)
success = execute_js('index.js')
input('Press any key to close')
