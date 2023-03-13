# Command Timing

To delay the execution of a command in a Unix-based operating system like macOS, you can use the at command. The at command allows you to schedule commands to run at a specific time in the future.

Here's an example of how you could use at to schedule a command to run on a specific date and time:

```shell
at 12:00 AM Saturday
```

This will open the at prompt, where you can enter the command you want to run. After entering the command, press CTRL + D to save and exit. The scheduled command will run at the specified time.

You can also use the at command with the -f option to specify a script file that contains multiple commands. For example:

```shell
at 12:00 AM Saturday -f script.sh
```

This will run the commands contained in the script.sh file at the specified time.

Note that you need to have the proper permissions to use the at command. If you're logged in as a regular user, you may need to use sudo to run at with superuser privileges.
