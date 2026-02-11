FROM node:16

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/

# 프로덕션 빌드를 위해 모든 의존성 설치
RUN yarn install

# 소스 코드 복사 및 빌드
COPY . /myfolder/
RUN yarn build

# 프로덕션 모드로 실행
CMD yarn start:prod

# FROM node:16

# COPY ./package.json /myfolder/
# COPY ./yarn.lock /myfolder/
# WORKDIR /myfolder/

# # 프로덕션 빌드를 위해 모든 의존성 설치
# RUN yarn install --frozen-lockfile

# # 소스 코드 복사 및 빌드
# COPY . /myfolder/
# RUN yarn build

# # 빌드 결과 확인
# RUN ls -la /myfolder/dist/ || (echo "Build failed!" && exit 1)

# # 프로덕션 모드로 실행
# CMD ["node", "dist/main"]


