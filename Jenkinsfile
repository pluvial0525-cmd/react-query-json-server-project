pipeline {
    agent any

    stages {

        stage('Install') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d --build'
            }
        }
    }
}