pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('OWASP Dependency Check') {
      steps {
        dependencyCheck additionalArguments: '--format HTML --format XML --disableNodeAudit --disableYarnAudit ', odcInstallation: 'Default'
      }
    }
     
    stage('Test') {
      steps {
        sh './script/test'
      }
    }      
  }

  post {
    success {
      dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    }
  }
}