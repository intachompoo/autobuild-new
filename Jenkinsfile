def emailNotify(currentBuildresult) {
       env.ForEmailPlugin = env.WORKSPACE
       emailext body: '''${SCRIPT, template="groovy-html.template"}''',
       subject: "Jenkins stage ${env.STAGE_NAME} ${currentBuildresult} : Job ${env.JOB_NAME}",
       to: 'nattawat.i@g-able.com'
}

def finallyNotify(currentBuildresult) {
        env.ForEmailPlugin = env.WORKSPACE
        emailext attachmentsPattern: '**/target/surefire-reports/TEST-*.xml',
        body: '''${SCRIPT, template="groovy-html.template"}''',
        subject: "Jenkins finally pipeline ${currentBuildresult}: Job ${env.JOB_NAME}",
        to: 'nattawat.i@g-able.com'
}

def remote = [:]
remote.name = "ansiblehost"
remote.host = "10.88.66.114"
remote.allowAnyHosts = true

node('docker-jnlp-slave')
{
    try
    {

      stage ('Checkout SCM')
     {
       try
       {
          echo "Checkout SCM"
          checkout scm
       }
       catch (err)
       {
          throw err
       }
       finally
       { emailNotify("${currentBuild.currentResult}") }
     }

        stage ('Docker-Host')
        {
         try
			       {
			            docker.withServer('tcp://10.88.66.114:4243') {
                     docker.withRegistry('https://harbor.pcf.domain.cloud', 'harbor101') {
				                //def image = docker.build("cicd/mynode:9.0.${env.BUILD_NUMBER}")
                        sh 'echo would be connecting to $DOCKER_HOST'
					              //sh 'curl http://10.88.66.114:4243/version'
                        //image.push()
                        sh 'docker images|grep mynode'
                    }
                }

                docker.withServer('tcp://10.88.66.105:4243') {
                   docker.withRegistry('https://harbor.pcf.domain.cloud', 'harbor101') {
                      sh 'echo would be connecting to $DOCKER_HOST'
                      sh 'docker images|grep slave'
                   }
                }
			      }
         catch (err)
			     {
			        throw err
			     }
         finally
			     {
			        emailNotify("${currentBuild.currentResult}")
			     }
        }

        stage ('SSH-Remote')
       {
         try
         {
           withCredentials([sshUserPrivateKey(credentialsId: 'ansible114', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'root')]) {
               remote.user = root
               remote.identityFile = identity
               sshCommand remote: remote, command: 'git clone https://github.com/PerchCMS/simple-docker.git'
               sshCommand remote: remote, command: 'cd simple-docker'
               sshCommand remote: remote, command: 'ls -la'
           }
         }
         catch (err)
         {
            throw err
         }
         finally
         { emailNotify("${currentBuild.currentResult}") }
       }

    }
    catch (err)
    {
        //Do something
        currentBuild.result = 'FAILURE'
        throw err
    }
    finally
    {
        stage('Finally-Email')
         {
           echo "currentBuild.result = ${currentBuild.result}"
           echo "currentBuild.currentResult = ${currentBuild.currentResult}"
           finallyNotify("${currentBuild.result}")
         }
    }
}
