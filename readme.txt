docker build -t my-jenkins .

cmd용
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home my-jenkins

powershell용

docker run -d \
--name jenkins \
-p 8080:8080 \
-p 50000:50000 \
-v jenkins_home:/var/jenkins_home \
my-jenkins

비밀번호 찾는코드
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword

00b70868702e4f82b5909d4639c78f92



캐시랑 파일 다 지우는거
1. docker rm -f jenkins
2. docker rmi -f my-jenkins
3. docker volume rm jenkins_home
4. docker builder prune -af
5. docker system prune -af
6. docker build --no-cache -t my-jenkins .
7. docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --restart unless-stopped my-jenkins
8. docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword