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
              image 'node'
            }
          }
          steps {
            sh 'npm install'
            sh 'npm test'
          }
        }
      }
    }
  }
  post {
    success {
      agent any
      dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
  }
}