# 🏠 HOUSE SERVICE
### 🚀 How to use
#### Install
```
$ yarn install
```
#### Start
```
$ yarn dev
```

### 🐳 Docker
#### Start a postgres instance
```
$ sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
#### Initialize
```
$ sudo docker start database
```

### 🗃 Create database
#### Connection data
User         | Password      | Host          | Port
------------ | ------------- | ------------- | -------------
postgres     | docker        | localhost     | 5432

#### Database name
houseservice

### 💠 Sequelize
```
$ yarn sequelize db:migrate
```
```
$ yarn sequelize sequelize db:seed
```
