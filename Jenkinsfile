pipeline {
    agent {
        docker {
            image 'docker:25.0'                     // This container has Docker CLI
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }

    stages {
        stage('Docker Test') {
            steps {
                sh '''
                    ls -la
                    docker --version
                    docker ps
                    ls -la
                '''
            }
        }
    }
}