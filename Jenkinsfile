pipeline {
    agent {
        label 'non_critical_task'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the Git repository
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/dev']], userRemoteConfigs: [[url: 'https://github.com/Soymilk1006/TripTribe-Backend.git']]])
                }
            }
        }

    }
}

