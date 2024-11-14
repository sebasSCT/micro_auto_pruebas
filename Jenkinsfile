pipeline {
    agent any

    tools {
        nodejs 'Nodejs-20.13.1'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'proyectofinal', url: 'https://github.com/sebasSCT/micro_auto_pruebas.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test_1'  
            }
        }

        stage('Generate Report') {
            steps {
                sh 'npm run report'  
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: true, 
                keepAll: true,  
                reportDir: 'reports',  
                reportFiles: 'cucumber_report.html',  
                reportName: 'Cucumber JS Test Report' 
            ])
        }
    }
}
