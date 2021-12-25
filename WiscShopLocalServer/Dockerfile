# Set base image (host OS)
FROM python:3.8-alpine
RUN apk update && apk add gcc libc-dev make git libffi-dev openssl-dev python3-dev libxml2-dev libxslt-dev

# By default, listen on port 5001
EXPOSE 5001/tcp

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY ./src /app/


# Specify the command to run on container start
CMD [ "python", "./api.py" ]
