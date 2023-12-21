pipeline {
    agent {
        label 'non_critical_task'
    }

    stages {
        stage('Configure Git') {
            steps {
                script {
                    // Run git config command to modify configuration
                    sh 'git config --global --add safe.directory "*"'
                }
            }
        }

        stage('Checkout') {
            steps {
                // Clean up the workspace to ensure a clean Git repository
                cleanWs()

                // Checkout the repository
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Soymilk1006/TripTribe-Backend.git']]])
            }
        }

        // Add more stages for your pipeline as needed
        stage('Build') {
            steps {
                // Your build steps here
            }
        }

        stage('Test') {
            steps {
                // Your test steps here
            }
        }

        // Add more stages as needed
    }

    post {
        always {
            // Clean up or perform actions that should run regardless of success or failure
        }
    }
}
