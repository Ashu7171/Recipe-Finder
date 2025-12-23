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
        VITE_API_KEY = credentials('SPOONACULAR_API_KEY')
        REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
        IMAGE    = "2401063/recipe-finder"
        VERSION  = "v5"  // 🔥 UPDATE VERSION EACH DEPLOYMENT
    }

    stages {

        /* ------------------------- FRONTEND BUILD ------------------------- */
        stage('Install + Build Frontend') {
            steps {
                container('node') {
                    sh '''
                        echo "Building frontend at repo root"
                        export VITE_API_KEY=$VITE_API_KEY
                        npm install
                        npm run build
                        ls -la
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
                        docker version
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
                          -Dsonar.login=sqp_2262df8f99de509600d563dcc48895aedaeb4c46
                    '''
                }
            }
        }

        /* ---------------------- DOCKER LOGIN ------------------------------ */
        stage('Login to Nexus Registry') {
            steps {
                container('dind') {
                    sh '''
                        echo "Logging into Nexus..."
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
                        echo "Tagging and pushing image..."
                        docker tag $IMAGE:$VERSION $REGISTRY/$IMAGE:$VERSION
                        docker push $REGISTRY/$IMAGE:$VERSION
                    '''
                }
            }
        }

        /* ---------------------- DEPLOY TO K8S ----------------------------- */
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    dir('k8s'){
                        sh """
                        echo "Applying deployment"
                        kubectl apply -f deployment.yaml -n 2401063
                        echo "Waiting for rollout"
                        kubectl rollout status deployment/recipie-finder-deployment -n 2401063  
                    """
                    }
                }
            }
        }
    }
}
