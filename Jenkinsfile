pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:

  - name: node
    image: node:18
    command: ["cat"]
    tty: true

  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ["cat"]
    tty: true

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["cat"]
    tty: true
    securityContext:
      runAsUser: 0
      readOnlyRootFilesystem: false
    env:
      - name: KUBECONFIG
        value: /kube/config
    volumeMounts:
      - name: kubeconfig-secret
        mountPath: /kube/config
        subPath: kubeconfig

  - name: dind
    image: docker:24.0-dind
    securityContext:
      privileged: true
    args:
      - "--storage-driver=overlay2"
      - "--insecure-registry=nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
    env:
      - name: DOCKER_TLS_CERTDIR
        value: ""
    volumeMounts:
      - name: docker-storage
        mountPath: /var/lib/docker

  volumes:
    - name: kubeconfig-secret
      secret:
        secretName: kubeconfig-secret

    - name: docker-storage
      emptyDir: {}

'''
        }
    }

    environment {
        REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
        IMAGE    = "2401063/recipe-finder"
        VERSION  = "v2"   // 🔥 ALWAYS UPDATE VERSION FOR NEW DEPLOYMENT
    }

    stages {

        /* ------------------------- FRONTEND BUILD ------------------------- */
        stage('Install + Build Frontend') {
            steps {
                container('node') {
                    sh '''
                        echo "Installing dependencies..."
                        npm install

                        echo "Building Vite project..."
                        npm run build

                        echo "Fixing audit issues..."
                        npm audit fix || true
                    '''
                }
            }
        }

        /* ------------------------- DOCKER BUILD --------------------------- */
        stage('Build Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        echo "Waiting for Docker daemon..."
                        sleep 10

                        echo "Docker version:"
                        docker version

                        echo "Building Docker image..."
                        docker build -t $IMAGE:$VERSION .
                    '''
                }
            }
        }

        /* ------------------------- SONARQUBE ------------------------------ */
        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=2401063-ashutosh \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                          -Dsonar.login=sqp_fec0d2cd0d6849ed77e9d26ed8ae79e2a03b2844
                    '''
                }
            }
        }

        /* ---------------------- DOCKER LOGIN ------------------------------ */
        stage('Login to Nexus Registry') {
            steps {
                container('dind') {
                    sh '''
                        echo "Logging in to Nexus registry..."
                        docker login $REGISTRY -u admin -p Changeme@2025
                    '''
                }
            }
        }

        /* ---------------------- PUSH IMAGE ------------------------------- */
        stage('Push to Nexus') {
            steps {
                container('dind') {
                    sh '''
                        echo "Tagging image for Nexus..."
                        docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION

                        echo "Pushing image..."
                        docker push $REGISTRY/$IMAGE:$VERSION || {
                            echo "Retrying push..."
                            sleep 5
                            docker push $REGISTRY/$IMAGE:$VERSION
                        }
                    '''
                }
            }
        }

        /* ---------------------- DEPLOY TO K8S ----------------------------- */
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    sh """
                        echo "Deploying to Kubernetes namespace 2401063..."
                        kubectl apply -f k8s/deployment.yaml -n 2401063

                        echo "Checking deployment status..."
                        kubectl rollout status deployment/recipe-finder-deployment -n 2401063
                    """
                }
            }
        }
    }
}
