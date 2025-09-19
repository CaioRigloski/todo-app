#!/bin/sh
set -e

# Espera o MySQL estar pronto
echo "Aguardando o banco de dados..."
until nc -z -v -w 5 db 3306
do
  echo "Banco não disponível, tentando novamente..."
  sleep 2
done

echo "Banco disponível! Rodando migrações..."
npx prisma migrate deploy

echo "Iniciando aplicação..."
npm run start
