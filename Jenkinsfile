pipeline  {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    }
    stage ('Docker Build') {
        withDockerServer([uri: "tcp://docker-node:2375"]) {
           agent { dockerfile true }
           stages {
              stage('Test') {
                 steps {
                    sh 'node --version'
                    sh 'yarn --version'
                 }
              }
           }
           withDockerRegistry([credentialsId: '5f753b7a-1326-4229-866d-2bb761d7f546', url: "https://index.docker.io/v1/"]) {
           // we give the image the same version as the .war package
           def image = docker.build("nattawin/mynode:2.0.${env.BUILD_NUMBER}")
           image.push()
        }
    }
