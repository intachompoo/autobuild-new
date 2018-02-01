pipeline  {
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
    }
    stage ('Docker Build') {
        withDockerServer([uri: "tcp://docker-node:2375"]) {
        agent {
           dockerfile true
        }
           stages {
              stage('TEST') {
                 steps {
                    sh 'node --version'
                    sh 'yarn --version'
                 }
              }
           }
         }
    }
}
