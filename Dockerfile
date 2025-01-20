# Usa una imagen base de Nginx para servir archivos estáticos
FROM nginx:alpine

# Copia los archivos del proyecto al directorio predeterminado de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80