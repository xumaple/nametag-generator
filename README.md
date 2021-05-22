# Nametags

## Getting started

Run the setup script. This script assumes that you have the following already installed: 
- Python 3
    - pip
- npm

```sh
sudo sh setup.sh
```

The script will set up a virtual environment for the backend, as well as install all JS/Python dependencies. 

## Running the server

```sh
./runServer build
```

Then visit the webpage from your browser at url [0.0.0.0:8000](0.0.0.0:8000)!

*Alternativtely*, if you don't want to rebuild the javascript and restart the server everytime you make a JS change, you can split it into two terminal commands: 

```sh
npm run dev
```
This will cause the JS compiler to watch for changes indefinitely and update as you save your files (until you Ctrl-C). Then, on a fresh terminal, run the server without the build command: 
```sh
./runServer
```
