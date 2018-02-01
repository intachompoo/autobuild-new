pipeline  {
    agent {
    dockerfile true
    }
    stages {
        checkout scm
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'yarn --version'
            }
        }
    }
}
