# WiscShopLocalServer
A local endpoint for the WiscShop server provided as an alternative to the endpoint available at `http://cs571.cs.wisc.edu:5000`

## About
- We have elected to provide the option to fetch from a local instance of the endpoint, because a Dialogflow intent has an inflexible timeout deadline of 5 seconds, and some students may not have a 5 second latency to our online endpoint. 
- Use the local endpoint _only if you are experiencing a long latency_ between your webhook and our online API endpoint at `http://cs571.cs.wisc.edu:5000`.

## Prerequisite
1. Install Docker by following the install guide for your operating system
    - [Windows](https://docs.docker.com/desktop/windows/install/)
    - [Ubuntu (20.04)](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
    - [macOS](https://docs.docker.com/desktop/mac/install/)

## How to setup

1. Clone this repository to your local machine.
2. `cd` into the cloned local repository. 
3. Build docker image using Dockerfile:
```sh
sudo docker build . -f Dockerfile -t wisc/cs571/fa21/wiscshop
```
4. Run the built image in a Docker container:
```sh
sudo docker run --restart=always -p 5000:5000 wisc/cs571/fa21/wiscshop:latest
```
5. The API endpoint should be accessible at `http://localhost:5000`.

- Note: _Omit `sudo` in the commands if you are on Windows._
