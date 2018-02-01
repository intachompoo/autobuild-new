pipeline  {
    agent {
    dockerfile true
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'yarn --version'
                sh 'curl -i 127.0.0.1:8080'
            }
        }
    }
}
