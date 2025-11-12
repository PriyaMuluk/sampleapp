// Jenkinsfile - Scripted Pipeline (Windows)
timestamps {
  node {
    try {
      stage('Checkout') {
        echo '=== Stage 1: Checkout ==='
        checkout scm
        echo 'Repository cloned successfully.'
      }

      stage('Build') {
        echo '=== Stage 2: Build ==='
        bat 'echo Installing dependencies...'
        bat 'npm install'
        echo 'Build completed successfully.'
      }

      stage('Test') {
        echo '=== Stage 3: Test ==='
        try {
          bat 'npm test'
          echo 'All unit tests passed successfully.'
        } catch (err) {
          echo "Test stage failed: ${err}"
          currentBuild.result = 'UNSTABLE'
        }
      }

      stage('Deploy') {
        echo '=== Stage 4: Deploy ==='
        bat 'if not exist deploy mkdir deploy'
        bat 'copy package.json deploy\\'
        echo 'Deployment simulation completed.'

        // Archive artifacts
        archiveArtifacts artifacts: 'deploy/**', fingerprint: true
      }

    } catch (e) {
      echo "Pipeline failed with error: ${e}"
      currentBuild.result = 'FAILURE'
      throw e
    } finally {
      echo "Pipeline finished at: ${new Date()}"
    }
  }
}
