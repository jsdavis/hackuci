var python_lessons = [
	{
		"lesson" : {
			"id" : 1,
			"title": "Let's write your first Python program: Hello World!",
			"steps": [
			"Type the following into the text editor: print('Hello World!')",
			"Test your finished work by clicking the 'Run' button and checking your result in the console below!"
			],
			"skeleton": "# Type your code in the line below\n",
			"evaluateCode": null,
			"expectedResult": /hello\s+world!*/i,
			"successMessage": "Congratulations! You can now move onto the next lesson. Click the 'Next Lesson' button.",
			"exceptionFeedback": {
				"exception": "Oops! Looks like something is wrong.",
				"syntaxError": "Make sure that you have correct pairs of (), single quotes, and/or double quotes."
			}
		}
	},
	{
		"lesson" : {
			"id" : 2,
			"title": "Let's learn about variables!",
			"steps": [
			"Here we have a variable, x, that needs to be assigned a number. Finish the code by typing any integer to assign to x.",
			"Try printing x now: print(x)",
			"Test your finished work by clicking the 'Run' button!"
			],
			"skeleton": "# Assign a value to x below, and print the variable!\nx = ",
			"evaluateCode": [
				/x\s*=\s*\d/,
				/print\s*\(\s*x\s*\)/
			],
			"expectedResult": null,
			"successMessage": "Congratulations! You can now move onto the next lesson. Click the 'Next Lesson' button.",
			"exceptionFeedback": {
				"exception": "Oops! Looks like something is wrong. Are you printing your variable? Does it show up in the console below?",
				"syntaxError": "Make sure that you have correct pairs of (), single quotes, and/or double quotes."
			}
		}
	}
]
