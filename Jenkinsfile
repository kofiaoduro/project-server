pipeline {
    agent {
        docker {
            image 'docker:25.0'
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
                    docker --version
                    docker ps
                    test -f project1/Dockerfile
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG project1'
            }
        }

        stage('Verify Image') {
            steps {
                sh 'docker inspect $IMAGE_NAME:$IMAGE_TAG > /dev/null 2>&1'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker_hub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
            }
        }
    }
}