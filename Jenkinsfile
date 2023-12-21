pipeline {
    agent any

    environment {
        registryCredential = 'ecr:ap-southeast-2:awscreds'
        appRegistry = "067912176361.dkr.ecr.ap-southeast-2.amazonaws.com/triptribe-backend"
        backendRegistry = "https://067912176361.dkr.ecr.ap-southeast-2.amazonaws.com"
    }
    
    stages {
  
        stage('Checkout Git Repository') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/dev']], userRemoteConfigs: [[url: 'https://github.com/Soymilk1006/TripTribe-Backend.git']]])
                }
            }
        }

        // Add additional stages as needed
    

        stage('set up .env file') {
            steps {
                sh '''echo \'
                NODE_ENV=development
                PORT=8080
                DATABASE_PORT=27017
                DATABASE_HOST=172.17.0.1
                DATABASE_NAME=tripTribeDb\' > .env'''
            }
        }
    }
}
