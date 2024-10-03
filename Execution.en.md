# Application Execution Guide
To execute the application, I have documented two methods. I recommend using the Docker method as it is more reliable and less error-prone. However, I've also provided instructions for running the program without Docker, but please be aware that this method is more complex and may have unforeseen errors.

[Login credentials](ExampleUsers.md)<br>
[Aplication once is running](http://localhost:3005/)<br>

## Docker (Recommended)
Steps to execute the application:

1. Have Docker Installed and Running

To check if Docker is installed on your system, you can run the following command in the Windows command prompt or Linux console:

```
docker -v
```
If Docker is installed, it should respond with something like:
```
Docker version 24.0.5, build ced0996
```
If Docker is not installed, you can install it from the following links:

Windows: https://docs.docker.com/desktop/install/windows-install/ <br>
Linux: https://docs.docker.com/desktop/install/linux-install/ <br>
After installation, verify that Docker is running.

2. Check Port Availability

This application defaults to using ports `5000 and 3005`, so ensure that these ports are not in use on your machine. By default, these ports are typically available on both Windows and Linux. However, if another application is using these ports on your local machine, you may encounter a message like this when running Docker:

```
Bind for 0.0.0.0:5000 failed: port is already allocated
```
It's necessary to free up these mentioned ports (5000, 3005) for the correct execution of the application. Alternatively, you can change the configuration in the docker-compose.yml file to use different ports, but I don't recommend this if you haven't worked with Docker before.

3. Run Docker Compose

Open your terminal (either the Windows command prompt or the Linux command line) and navigate to the application's folder. Once you're in the application folder, execute the following command:
```
docker compose -f "docker-compose.yml" up -d --build
```

Once the Docker command is executed, it will configure and run the application as specified. This process may take a few minutes, but once it completes successfully, you will have the application running on `ports 3005 and 5000`, and you can access it in your web browser at the following URL: `http://localhost:3005/`

## Manual Execution
In case using Docker is not possible, you can manually execute the application, but this method has several prerequisites.

### Prerequisites:
1. Install Node.js 18 or higher (https://nodejs.org/en/download)
2. Install PostgreSQL (https://www.postgresql.org/download/)
3. Install Nest CLI (https://docs.nestjs.com/cli/overview)

### Procedure
Once you've met the prerequisites, follow these steps:

#### Backend
1. Install Necessary Dependencies<br>
Open your terminal (Windows command prompt or Linux command line) and navigate to the application folder. Once there, go into the "backend" folder and execute the following command:
```
npm install
```

2. Modify Environment Variables<br>
In the .env file, modify the `DATABASE_URL=` variable to contain the connection URI to your database, which usually looks like this:

```
postgresql://user:password@Hostname:port/dbname
```
3. Migrate Schemas to the Database<br>
After configuring the database URL, run the following commands in the terminal:

```
npx prisma generate
```
```
npx prisma db push
```
These commands will synchronize the code schemas with the database.

4. Run the Backend<br>
Once you've synchronized the database with the schemas, run the backend with the following command:

```
npm run start:prod
```
**Important:** Do not close this terminal, as closing it will stop the program's execution.

#### Frontend
1. Install Necessary Dependencies<br>
Open your terminal (Windows command prompt or Linux command line) and navigate to the application folder. Once there, go into the "frontend" folder and execute the following command:

```
npm install
```
2. Run the Application<br>
For simplicity, let's run the application in development mode. Execute the following command:
```
npm start
```
This command should start the frontend on port 3000 and open your browser to the application. If the browser does not open, you can access the application in your browser at the URL `http://localhost:3000/`

**Important:** Do not close this terminal, as closing it will stop the program's execution.<br>

Note: For production, you would need to configure Nginx or another method to serve static files and execute npm run build.