# TEST API

The idea is expose a REST API with authentication. 

## Requeriments
- NodeJS > 18
- Prisma > 6

## Installation

Now we need to use a local environment with NodeJS
```bash
npm install
```

In the future is put Docker Compose and create a full local environment

## Prisma client
Prisma allows connect the data with the backend, yeah is a ORM.
<https://www.prisma.io/>

It's mandatory the below environments.

- DATABASE_URL
- SECRET_KEY


If you want apply and generate the prisma client
```bash
npx prisma migrate dev
npm run db:generate
npm run db:seed
```


To create a development server run the below command:
```bash
npm run dev
```


## Setup

### Hosts
We need to modify the host configuration to use "db.sandbox" like localhost

Please open this file
```bash
sudo vim /etc/hosts
```

Add the follow line
```bash
127.0.0.1    db.sandbox
127.0.0.1    api.sandbox
```

### Docker Compose
Firstly clone the repository,

Fill the `.env` file (ask the team for the current values of the variables)
```bash
cp .env.example .env
```

Install dependencies
```bash
npm install
```

Generate Prisma client
```bash
npm run db:generate
```

Lunch containers
```bash
docker compose up -d
```

Create initial BBDD
```bash
npm run db:reset
```

API service must run on 
http://localhost:8080

## Update changes

Pull all changes of the branch with
```bash
git pull origin BRANCH
```

Recreate Prisma client
```bash
npm run db:generate
```

If you want recreate all BBDD
```bash
npm run db:reset
```

Or you can update with
```bash
npm run db:push
```

To create more dummy data 
```bash
npm run db:seed
```

## Update since 1.47.37
Install sharp
###  Apple Intel
```bash
rm -rf node_modules/sharp
npm install --platform=linuxmusl --arch=x64 --sharp-install-force sharp
```

###  Apple M1
```bash
rm -rf node_modules/sharp
npm install --arch=arm64 --platform=linux --libc=musl sharp
```

### Create migrations
```bash
npx prisma migrate dev --create-only
```


## Production
Coming soon
