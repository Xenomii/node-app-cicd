pipeline {
  agent none
  stages {
    stage('Unit Test') {
      parrallel{
        stage('Node Test') {
          agent {
            docker {
              image 'node:8'
            }
          }
          steps {
            sh 'npm install'
            sh './script/test.sh'
          }
        }
      }
    }
    stage('OWASP Dependency Check') {
      steps {
        dependencyCheck additionalArguments: '--format HTML --format XML --disableNodeAudit --disableYarnAudit ', odcInstallation: 'Default'
      }
    }
  }
  post {
    success {
      dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
  }
}