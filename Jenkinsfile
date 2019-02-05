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
def image
def gitCommitNum
def COMMITID
//def version = sh( script: 'git rev-parse --short HEAD > short-git-sha.tmp', returnStdout: true).toString().trim()
    try
    {

      stage ('Checkout SCM')
     {
       try
       {
          echo "Checkout SCM"
          checkout scm
          gitCommitNum = sh( script: 'git rev-parse --short HEAD > gitCommitNum')

          //def env.GIT_COMMIT_NUM = sh( script: 'git rev-parse --short HEAD > short-git-sha.tmp', returnStdout: true)
          //echo 'using new version ' +  GIT_COMMIT_NUM
          COMMITID = sh(returnStdout: true, script: 'git rev-parse --short HEAD').toString().trim()
          echo "git commit number ${COMMITID}"
       }
       catch (err)
       {
          throw err
       }
       finally
       { emailNotify("${currentBuild.currentResult}") }
     }

        stage ('Build-Image')
        {
         try
			       {
			            docker.withServer('tcp://10.88.66.114:4243') {
                     docker.withRegistry('https://harbor.pcf.domain.cloud', 'harbor101') {
				                image = docker.build("cicd/mynode:${COMMITID}")
                        sh 'echo would be connecting to $DOCKER_HOST'
					              //sh 'curl http://10.88.66.114:4243/version'
                        //image.push()
                    }
                }
			      }
         catch (err)
			     {
			        throw err
			     }
         finally
			     {
			        //emailNotify("${currentBuild.currentResult}")
			     }
        }

        stage ('Docker-Compose-UP')
        {
         try
			       {
			            docker.withServer('tcp://10.88.66.114:4243') {
                     docker.withRegistry('https://harbor.pcf.domain.cloud', 'harbor101') {
                       sh 'export COMMITID=${COMMITID} && docker-compose up -d commitId=$COMMITID'
                       //sh 'docker-compose down -v'
                    }
                }
			      }
         catch (err)
			     {
			        throw err
			     }
         finally
			     {
			        //emailNotify("${currentBuild.currentResult}")
			     }
        }

    /*  stage ('SSH-Remote')
       {
         try
         {
           withCredentials([sshUserPrivateKey(credentialsId: 'ansible114', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'root')]) {
               remote.user = root
               remote.identityFile = identity
               sshCommand remote: remote, command: 'rm -rf ~/simple-docker'
               sshCommand remote: remote, command: 'git clone https://github.com/PerchCMS/simple-docker.git'
               sshCommand remote: remote, command: 'cd ~/simple-docker && ls -la ~/simple-docker'
               sshCommand remote: remote, command: 'rm -rf ~/simple-docker'
           }
         }
         catch (err)
         {
            throw err
         }
         finally
         { emailNotify("${currentBuild.currentResult}") }
       } */

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
