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

node('docker-jnlp-slave')
{
    try
    {
        stage ('Docker-Host')
        {
         try
			       {
			            docker.withServer('tcp://10.88.66.114:4243') {
                     docker.withRegistry('https://harbor.pcf.domain.cloud') {
				                def image = docker.build("nattawin/mynode:2.0.${env.BUILD_NUMBER}")
                        sh 'echo would be connecting to $DOCKER_HOST'
					              sh 'curl http://10.88.66.114:4243/version'

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
