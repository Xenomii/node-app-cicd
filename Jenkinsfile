pipeline {
  agent none
  stages {
    stage('Unit Test') {
      agent {
        docker {
          image 'node'
        }
        steps {
          sh 'npm install'
          sh './script/test.sh'
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