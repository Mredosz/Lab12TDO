pipeline {
    agent {
        docker {
            image 'mredosz/lab12tdo:1.0.1'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds-id')
        IMAGE_NAME = "mredosz/lab12tdo"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Parallel Tests & Coverage') {
            parallel {
                stage('Unit Tests & Coverage') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                junit 'coverage/junit.xml'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = "${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    latestImage = "${IMAGE_NAME}:latest"
                    sh """
                        docker build -t ${dockerImage} .
                        docker tag ${dockerImage} ${latestImage}
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

   post {
       always {
           script {
               echo 'Cleaning up...'
               sh '''
                   docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true
                   docker rmi ${IMAGE_NAME}:latest || true
                   docker logout
               '''
           }
       }
       success {
           echo '✅ Build and deploy completed successfully.'
       }
       failure {
           echo '❌ Build failed.'
       }
   }
}
