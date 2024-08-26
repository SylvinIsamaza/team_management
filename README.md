# Football Management System
Football management backend
## Getting started
1. Clone Repository
    ```
    git clone https://github.com/SylvinIsamaza/team_management.git
    ```
2. Rename .env.example to .env


3. Update .env to 

    | Parameter | Description                       |
    | :-------- | :-------------------------------- |
    | `DB_URL`  | **Required**. mongodb url         |
    | `PORT`  | **Required**. Port for the application to run on         |

4. Install the dependencies
    ```
    npm install  && npm install -g nodemon
    ```
4. Run the application
    ```bash
     npm run dev
    ```
5. Try the api  on http://localhost:{PORT}/api-docs/

    for example if the port is 5000 link will be http://localhost:5000/api-docs/
## Authors
- [@SylvainIsamaza](https://www.github.com/SylvinIsamaza)