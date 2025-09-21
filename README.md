
# Todo App ✅

Aplicação **Fullstack** composta por:
- **Backend**: NestJS + Prisma + MySQL (rodando em Docker)
- **Frontend**: Vue 3 + Vite

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```sh
git clone https://github.com/CaioRigloski/todo-app.git
cd todo-app
```

---

### 2. Backend (NestJS + Prisma + MySQL)
Entre na pasta do backend:
```sh
cd backend
```

Se estiver usando **Windows**, rode o comando abaixo para evitar problemas com quebras de linha no script `entrypoint.sh`:
```sh
dos2unix entrypoint.sh
```

Agora suba os containers com Docker Compose:
```sh
docker compose up -d
```

---

### 3. Frontend (Vue + Vite)
Entre na pasta do frontend:
```sh
cd ../frontend
```

Crie o arquivo `.env` com o endereço da api;
```
echo "VITE_API_URL=http://localhost:3000" > .env
```

Instale as dependências:
```sh
npm install --legacy-peer-deps
```

Build do frontend:
```sh
npm run build
```

Instale o servidor estático `serve`:
```sh
npm install -g serve
```

Rode a aplicação em modo produção:
```sh
serve -s dist -l 5173
```

---

## 🔗 Endereços
- **Backend API** → [http://localhost:3000](http://localhost:3000)  
- **Frontend** → [http://localhost:5173](http://localhost:5173)  

---