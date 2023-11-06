# 9292Hoi - A Gamified Voice-based Travel Companion

## Introduction
This is a project design for the 9292 AI Challenge. The idea of this project is to bring a new feature to the 9292 app, which is a voice-based travel companion. The user can ask the voice assistant about the public transport in the Netherlands, about the travel information during their trips and the assistant will provide you with details information. The app can also give the user advice about the best route to take to get to a certain destination, some updates about delay or stops and some recommendations for local places. The app is also gamified, which means that the user can earn coins through their travel, which can help user engaging in their travel experience. The user can also use the coins to buy the customizations for their travel companion (the voice).

## Our Teams:
We called ourself `RUG-UT-RS`, we are a diverse group of students from the University of Gronigen, University of Twente and ReadSpeaker. The team members are:
  //TODO: Add team members
  - Phuoc Ho
  - [Aki Kunikoshi](https://github.com/yemaozi88?tab=repositories)
  - Yanpei Ouyang
  - Xueying Liu
  - Brandi
  - Chenyi

## Project Structure
- 



## General Information
### Planning
### System Design
![System Flow Diagram ](./SystemFlowDiagram.png)

### Implementation
#### Backend:
For the backend, using the resources provided by AWS environment of 9292 maily for the following tasks:
  - Analyse the data, through query by connecting with **S3 database**, using [AWS S3](https://s3.console.aws.amazon.com/s3/buckets/aiwedstrijd-team1?region=eu-central-1&tab=objects) to store the database, the data will be store in `.csv` format. In details:
    - Go to [AWS SageMaker -> Notebook -> Notebook Instances -> aiwedstijd-sagemaker-team1](https://eu-central-1.console.aws.amazon.com/sagemaker/home?region=eu-central-1#/notebook-instances/aiwedstijd-sagemaker-team1) to go to Jupyter Notebook environment
    - Working with Python to create the function to querying and merging the data, The following features/functions can be implemented:
        - A function that collects details about trasportations, travel companies and services: **Input:** 9292 Database/API -> **Output:** A `.csv` file store in S3
        - A function that collects all the locations (including names, places, coordinates)
- Working with 9292 API:
        - Link to the API: [9292 Original API](https://reisadvies-api-ast.9292.nl/v4)
        - Link to Documentation about the API [9292 API Documentation](https://reisadvies-api-ast.9292.nl/index.html) - Use this to see the endpoint call to get 9292 Data
      ***Notes***: remember to use the given token as an request *Header* and setting the parameters when sending a GET request

#### API - Connection between frontend and backend: 
Create a custom API so that it can be communicated with the backend
- Using [AWS Lambda](https://eu-central-1.console.aws.amazon.com/lambda/home?region=eu-central-1#/functions) to create the API that connect with AWS S3. This API will be used as a connection to the Frontend so that it can handling user input/request from the app
  - For example: Voice requests,...
- Using **`9292 Travel API`** for general travelling usage, this can also be connected with the S3 for different purposes
- Using **`ReadSpeakers API`** for generating voice from Voice Assistant text generation

#### Front-end
- Using React Native for UI, and handling user inputs
- Connect with `custom API` and `9292 API` for providing travel information
- Connect with `ReadSpeakers API` for providing voice feedbacks to phone speakers

### Task List:
