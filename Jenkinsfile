pipeline  {
    agent {
    checkout scm
    dockerfile true
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'yarn --version'
            }
        }
    }
}
