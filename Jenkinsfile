pipeline {
  agent none
  stages {
    stage('OWASP Dependency Check') {
      agent any
      steps {
        dependencyCheck additionalArguments: '--format HTML --format XML --disableNodeAudit --disableYarnAudit ', odcInstallation: 'Default'
      }
    }
    stage('Unit Test') {
      parallel {
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
  }
  post {
    success {
      dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
  }
}