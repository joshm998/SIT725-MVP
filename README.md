# SIT725-MVP
Aqua Water Management MVP

### Running the Development Environment

1. Clone the repo
   ```sh
   git clone https://github.com/joshm998/SIT725-MVP.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run Project
   ```sh
   npm start
   ```

### Linting 
```sh
   npm run lint
```

### Building Docker Images 
```sh
   docker build -t joshm998/aqua .
```

```sh
   docker run -p 49610:8080 -d joshm998/aqua
```