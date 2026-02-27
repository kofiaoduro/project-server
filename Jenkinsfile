pipeline {
    agent {
        docker {
            image 'docker:25.0'                     // This container has Docker CLI
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }

    environment {
        IMAGE_NAME = 'koduro/backend'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Docker Test') {
            steps {
                sh '''
                    ls -la
                    docker --version
                    docker ps
                    ls -la
                    # check to see if your docker file exits
                    test -f project1/Dockerfile
                '''
            }
        }
        stage('Docker build') {
            steps{
                echo 'We are building the image'
                sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG -f project1/Dockerfile
                '''
            }
        }
    }
}