
 
 pipeline {
    agent {
        label 'non_critical_task'
    }
    tools {
        jdk 'openjdk'
        dockerTool 'docker-latest'
        nodejs 'nodejs-21.4.0'
        maven 'maven-3.9.6'
        gradle 'gradle-8.5'
        nodejs 'nodejs-21.4.0'

   
        
    }
    
    
    environment {
        AWS_DEFAULT_REGION="ap-southeast-2"
        PATH="/home/jenkins/node-v20.10.0-linux-x64/bin:/usr/bin:$PATH"


   }
   
    stages {
        stage('Check Java Env') {
            steps {
                sh '''
                    env | grep -e PATH -e JAVA_HOME
                    which java
                    java -version
                '''
            }
        }
        
        stage ('Check installed package'){
            steps {
              sh '''
                java --version
                git --version
                docker --version
                node -v
                npm -v
                aws --version
                mvn --version
                gradle --version
                vercel --version
                docker --version
                terraform --version
                whereis git
              '''
            }

        }
        
        stage('deploy to s3 bucket') {
            steps {
                    withCredentials([aws(accessKeyVariable:'AWS_ACCESS_KEY_ID', credentialsId:'aws_credentials', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                            sh "aws ec2 describe-instances"
                    }
            }
        }
    }
}
