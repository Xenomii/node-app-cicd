pipeline {
  agent any
    
  stages {
        
    stage('Git') {
      steps {
        git 'git@github.com:Xenomii/node-app-cicd.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh './script/test'
      }
    }
  }
}