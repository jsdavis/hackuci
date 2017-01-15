var python_lessons = [
	{
		"lesson" : {
			"id" : 1,
			"language" : "Python",
			"title": "Let's write your first Python program: Hello World!",
			"steps": [
			"Type the following into the text editor: print('Hello World!')",
			"Test your finished work by clicking the 'Run' button!"
			],
			"skeleton": "#TYPE YOUR CODE HERE\n",
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
			"language" : "Python",
			"title": "Let's learn about variables!",
			"steps": [
			"Here we have a variable, x, that needs to be assigned a number. Finish the code by typing any integer to assign to x.",
			"Try printing x now: print(x)",
			"Test your finished work by clicking the 'Run' button!"
			],
			"skeleton": "x = ",
			"expectedResult": "",
			"successMessage": "Congratulations! You can now move onto the next lesson. Click the 'Next Lesson' button.",
			"exceptionFeedback": {
				"exception": "Oops! Looks like something is wrong.",
				"syntaxError": "Make sure that you have correct pairs of (), single quotes, and/or double quotes."
			}
		}
	}
]
